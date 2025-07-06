import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const PeptideVial3D = ({ className = '' }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const vialGroupRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth < 768);

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Add renderer to DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create vial group
    const vialGroup = new THREE.Group();
    vialGroupRef.current = vialGroup;

    // Create glass vial body (cylinder)
    const vialGeometry = new THREE.CylinderGeometry(0.8, 0.8, 3, 32);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.3,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      thickness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const vialBody = new THREE.Mesh(vialGeometry, glassMaterial);
    vialBody.castShadow = true;
    vialBody.receiveShadow = true;

    // Create vial cap (cylinder)
    const capGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.3, 32);
    const capMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
    });
    const vialCap = new THREE.Mesh(capGeometry, capMaterial);
    vialCap.position.y = 1.8;
    vialCap.castShadow = true;

    // Create liquid inside vial
    const liquidGeometry = new THREE.CylinderGeometry(0.7, 0.7, 2.8, 32);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.5,
    });
    const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquid.position.y = -0.1;

    // Create label
    const labelGeometry = new THREE.PlaneGeometry(2, 0.8);
    const labelMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0, -0.5, 0.82);

    // Add floating particles around vial
    const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.6,
    });

    const particles = [];
    for (let i = 0; i < 20; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
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
    vialGroup.position.set(2, 0, 0);
    vialGroup.rotation.x = Math.PI * 0.1;

    scene.add(vialGroup);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x88ccff, 0.8, 10);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.5, 8);
    rimLight.position.set(3, -2, -3);
    scene.add(rimLight);

    // Mouse movement handler
    const handleMouseMove = (event) => {
      if (isMobile) return;
      
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Scroll handler for depth effect
    const handleScroll = () => {
      if (isMobile) return;
      
      const scrollY = window.scrollY;
      const maxScroll = 1000;
      const scrollProgress = Math.min(scrollY / maxScroll, 1);
      
      if (vialGroupRef.current) {
        vialGroupRef.current.position.z = scrollProgress * 2;
        vialGroupRef.current.scale.setScalar(1 + scrollProgress * 0.3);
      }
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
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate vial slowly
      if (vialGroupRef.current) {
        vialGroupRef.current.rotation.y += 0.005;
        
        // Mouse parallax effect (desktop only)
        if (!isMobile) {
          vialGroupRef.current.rotation.x = Math.PI * 0.1 + mouseRef.current.y * 0.1;
          vialGroupRef.current.rotation.z = mouseRef.current.x * 0.05;
        }
      }

      // Animate particles
      particles.forEach((particle, index) => {
        particle.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        particle.rotation.x += 0.01;
        particle.rotation.z += 0.005;
      });

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
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
  }, [isMobile]);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
      }}
    />
  );
};

export default PeptideVial3D;