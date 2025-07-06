import React, { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';

// Import Three.js properly for React
const PeptideVial3D = ({ className = '' }) => {
  const mountRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if mobile
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // Initialize Three.js with a small delay to ensure DOM is ready
    const initThreeJS = () => {
      try {
        console.log('Initializing Three.js...');
        
        // Only proceed if we have a mount point
        if (!mountRef.current) {
          console.log('No mount point available, retrying...');
          // Retry after a short delay
          setTimeout(initThreeJS, 100);
          return;
        }

        console.log('Creating Three.js scene...');

        // Scene setup
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.set(mobile ? 0 : 3, 0, 8);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ 
          antialias: !mobile, 
          alpha: true,
          powerPreference: mobile ? "low-power" : "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        if (!mobile) {
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }

        // Add renderer to DOM
        mountRef.current.appendChild(renderer.domElement);

        // Create vial group
        const vialGroup = new THREE.Group();

        // Create glass vial body (cylinder)
        const vialGeometry = new THREE.CylinderGeometry(0.6, 0.6, 2.5, mobile ? 16 : 32);
        const glassMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x88ccff,
          transparent: true,
          opacity: 0.25,
          roughness: 0.1,
          metalness: 0.1,
          transmission: mobile ? 0.5 : 0.9,
          thickness: 0.1,
          clearcoat: mobile ? 0.5 : 1.0,
          clearcoatRoughness: 0.1,
        });
        const vialBody = new THREE.Mesh(vialGeometry, glassMaterial);
        if (!mobile) {
          vialBody.castShadow = true;
          vialBody.receiveShadow = true;
        }

        // Create vial cap (cylinder)
        const capGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.25, mobile ? 16 : 32);
        const capMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x2563eb,
          roughness: 0.2,
          metalness: 0.8,
          clearcoat: mobile ? 0.5 : 1.0,
        });
        const vialCap = new THREE.Mesh(capGeometry, capMaterial);
        vialCap.position.y = 1.4;
        if (!mobile) vialCap.castShadow = true;

        // Create liquid inside vial
        const liquidGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2.3, mobile ? 16 : 32);
        const liquidMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x4f46e5,
          transparent: true,
          opacity: 0.7,
          roughness: 0.1,
          metalness: 0.1,
          transmission: 0.3,
        });
        const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
        liquid.position.y = -0.05;

        // Create simple label
        const labelGeometry = new THREE.PlaneGeometry(1.5, 0.6);
        const labelMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.8,
        });
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.set(0, -0.3, 0.65);

        // Add floating particles (fewer on mobile)
        const particleCount = mobile ? 8 : 15;
        const particleGeometry = new THREE.SphereGeometry(0.015, 6, 6);
        const particleMaterial = new THREE.MeshBasicMaterial({
          color: 0x88ccff,
          transparent: true,
          opacity: 0.5,
        });

        const particles = [];
        for (let i = 0; i < particleCount; i++) {
          const particle = new THREE.Mesh(particleGeometry, particleMaterial);
          particle.position.set(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 3
          );
          particles.push(particle);
          scene.add(particle);
        }

        // Add components to vial group
        vialGroup.add(vialBody);
        vialGroup.add(vialCap);
        vialGroup.add(liquid);
        vialGroup.add(label);

        // Position vial group
        vialGroup.position.set(mobile ? 0 : 2, 0, 0);
        vialGroup.rotation.x = Math.PI * 0.05;

        scene.add(vialGroup);

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, mobile ? 0.8 : 1.2);
        directionalLight.position.set(5, 5, 5);
        if (!mobile) {
          directionalLight.castShadow = true;
          directionalLight.shadow.mapSize.width = 1024;
          directionalLight.shadow.mapSize.height = 1024;
        }
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x88ccff, 0.6, 10);
        pointLight.position.set(-3, 2, 3);
        scene.add(pointLight);

        // Mouse tracking
        const mouse = { x: 0, y: 0 };

        // Mouse movement handler
        const handleMouseMove = (event) => {
          if (mobile) return;
          
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        // Scroll handler for depth effect
        const handleScroll = () => {
          if (mobile) return;
          
          const scrollY = window.scrollY;
          const maxScroll = 800;
          const scrollProgress = Math.min(scrollY / maxScroll, 1);
          
          vialGroup.position.z = scrollProgress * 1.5;
          vialGroup.scale.setScalar(1 + scrollProgress * 0.2);
        };

        // Resize handler
        const handleResize = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;
          
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          
          setIsMobile(width < 768);
        };

        // Add event listeners
        if (!mobile) {
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('scroll', handleScroll);
        }
        window.addEventListener('resize', handleResize);

        // Animation loop
        let animationId;
        const animate = () => {
          animationId = requestAnimationFrame(animate);

          // Rotate vial slowly
          vialGroup.rotation.y += mobile ? 0.003 : 0.005;
          
          // Mouse parallax effect (desktop only)
          if (!mobile) {
            vialGroup.rotation.x = Math.PI * 0.05 + mouse.y * 0.08;
            vialGroup.rotation.z = mouse.x * 0.03;
          }

          // Animate particles
          particles.forEach((particle, index) => {
            particle.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
            particle.rotation.x += 0.008;
            particle.rotation.z += 0.004;
          });

          // Render
          renderer.render(scene, camera);
        };

        animate();
        setIsLoaded(true);
        console.log('Three.js scene initialized successfully!');

        // Cleanup function
        return () => {
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
          
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', handleResize);
          
          if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
          }
          
          // Dispose of Three.js objects
          scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          });
          
          renderer.dispose();
        };
      } catch (error) {
        console.warn('3D vial failed to load, falling back to gradient background:', error);
        setHasError(true);
        setIsLoaded(false);
      }
    };

    // Start initialization with a small delay
    setTimeout(initThreeJS, 50);
  }, []);

  // Fallback for when 3D fails to load or on error
  if (hasError || !isLoaded) {
    return (
      <div 
        ref={mountRef}
        className={`absolute inset-0 overflow-hidden ${className}`}
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(139, 92, 246, 0.1) 100%)',
        }}
      />
    );
  }

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)',
      }}
    />
  );
};

export default PeptideVial3D;