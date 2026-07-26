import { useEffect, useRef } from "react";
import * as THREE from "three";

export function MonolithCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE & CAMERA SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    // 2. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. LIGHTING PIPELINE
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xd4af37, 2.5); // Champagne Gold key light
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8e8e93, 1.2); // Anodized Platinum fill
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0); // Metallic rim light
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // 4. PROCEDURAL LUXURY MATERIALS
    const chassisMetalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      roughness: 0.2,
      metalness: 0.9,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
    });

    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe0e0e0,
      roughness: 0.05,
      metalness: 0.98,
      reflectivity: 0.95,
    });

    const smokedGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      transmission: 0.65,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      ior: 1.5,
    });

    const boilerEmissiveMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      emissive: 0xd4af37,
      emissiveIntensity: 0,
      roughness: 0.3,
      metalness: 0.8,
    });

    const wireframeEmissiveMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    // ==========================================
    // 5. APPLIANCE A: THE INTELLIGENT ESPRESSO STATION
    // ==========================================
    const espressoGroup = new THREE.Group();
    scene.add(espressoGroup);

    // Base
    const espressoBaseGeo = new THREE.BoxGeometry(2.4, 0.4, 1.8);
    const espressoBase = new THREE.Mesh(espressoBaseGeo, chassisMetalMaterial);
    espressoBase.position.y = -1.0;
    espressoGroup.add(espressoBase);

    // Main Housing (Splits into Exploded View)
    const espressoHousingGroup = new THREE.Group();
    espressoGroup.add(espressoHousingGroup);

    const espressoBodyGeo = new THREE.BoxGeometry(2.2, 2.2, 1.6);
    const espressoBody = new THREE.Mesh(espressoBodyGeo, chassisMetalMaterial);
    espressoHousingGroup.add(espressoBody);

    // Boiler Cylinder Core (Glowing Interior)
    const boilerGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.4, 32);
    const boilerCore = new THREE.Mesh(boilerGeo, boilerEmissiveMaterial);
    boilerCore.position.set(0, 0, 0);
    espressoGroup.add(boilerCore);

    // Chrome Spout Assembly
    const spoutGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.6, 16);
    const chromeSpout = new THREE.Mesh(spoutGeo, chromeMaterial);
    chromeSpout.position.set(0, -0.6, 0.9);
    espressoGroup.add(chromeSpout);

    const portafilterGeo = new THREE.CylinderGeometry(0.3, 0.25, 0.25, 16);
    const portafilter = new THREE.Mesh(portafilterGeo, chromeMaterial);
    portafilter.position.set(0, -0.35, 0.85);
    espressoGroup.add(portafilter);

    // ==========================================
    // 6. APPLIANCE B: THE MONOLITH PRECISION OVEN
    // ==========================================
    const ovenGroup = new THREE.Group();
    scene.add(ovenGroup);
    ovenGroup.position.set(10, 0, 0); // Off-screen initially

    const ovenBodyGeo = new THREE.BoxGeometry(3.0, 2.4, 2.2);
    const ovenBody = new THREE.Mesh(ovenBodyGeo, chassisMetalMaterial);
    ovenGroup.add(ovenBody);

    // Front Glass Door (Modifies Opacity 0.85 -> 0.1)
    const ovenDoorGeo = new THREE.BoxGeometry(2.9, 2.3, 0.1);
    const ovenGlassDoor = new THREE.Mesh(ovenDoorGeo, smokedGlassMaterial);
    ovenGlassDoor.position.set(0, 0, 1.15);
    ovenGroup.add(ovenGlassDoor);

    // Internal Spinning Wireframe Core
    const ovenWireframeGeo = new THREE.IcosahedronGeometry(0.75, 2);
    const ovenWireframeCore = new THREE.Mesh(ovenWireframeGeo, wireframeEmissiveMaterial);
    ovenWireframeCore.position.set(0, 0, 0);
    ovenGroup.add(ovenWireframeCore);

    // Oven Interior Light Ring
    const ringGeo = new THREE.TorusGeometry(0.85, 0.04, 16, 32);
    const ovenRing = new THREE.Mesh(ringGeo, boilerEmissiveMaterial);
    ovenRing.rotation.x = Math.PI / 2;
    ovenGroup.add(ovenRing);

    // ==========================================
    // 7. APPLIANCE C: CULINARY PRESERVATION COLUMN
    // ==========================================
    const preservationGroup = new THREE.Group();
    scene.add(preservationGroup);
    preservationGroup.position.set(0, -12, 0); // Bottom off-screen initially

    // Tall Monolithic Column
    const columnBodyGeo = new THREE.BoxGeometry(3.2, 4.8, 2.2);
    const columnBody = new THREE.Mesh(columnBodyGeo, chassisMetalMaterial);
    preservationGroup.add(columnBody);

    // Interior Glass Shelves & Gold Ambient Strips
    for (let i = -1.5; i <= 1.5; i += 1.0) {
      const shelfGeo = new THREE.BoxGeometry(2.9, 0.05, 1.8);
      const shelf = new THREE.Mesh(shelfGeo, smokedGlassMaterial);
      shelf.position.set(0, i, 0);
      preservationGroup.add(shelf);
    }

    // Left French Door Pivot Assembly
    const leftDoorPivot = new THREE.Group();
    leftDoorPivot.position.set(-1.5, 0, 1.1); // Hinge left
    preservationGroup.add(leftDoorPivot);

    const leftDoorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.48, 4.7, 0.1),
      chassisMetalMaterial
    );
    leftDoorMesh.position.set(0.74, 0, 0); // Offset mesh relative to hinge
    leftDoorPivot.add(leftDoorMesh);

    // Right French Door Pivot Assembly
    const rightDoorPivot = new THREE.Group();
    rightDoorPivot.position.set(1.5, 0, 1.1); // Hinge right
    preservationGroup.add(rightDoorPivot);

    const rightDoorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.48, 4.7, 0.1),
      chassisMetalMaterial
    );
    rightDoorMesh.position.set(-0.74, 0, 0); // Offset mesh relative to hinge
    rightDoorPivot.add(rightDoorMesh);

    // ==========================================
    // 8. SCROLL CONTINUUM CONTROLLER & RAF LOOP
    // ==========================================
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        targetScrollProgress = Math.max(0, Math.min(1, window.scrollY / totalScroll));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth interpolation for 0ms lag scrubbing
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
      const p = currentScrollProgress;

      // ── SECTION A: ESPRESSO STATION (0.0 to 0.33 of overall scroll) ──
      // Stage 1 (0 - 0.12): Scale in 0->1, rotateY -1.5 -> 0
      // Stage 2 (0.12 - 0.25): Exploded view housing shift + emissive thermal glow 0->4
      // Stage 3 (0.25 - 0.33): Recedes off-screen
      if (p <= 0.35) {
        const localP = p / 0.35; // Normalized 0..1 inside Section A
        espressoGroup.visible = true;

        if (localP < 0.4) {
          const norm = localP / 0.4;
          const s = THREE.MathUtils.lerp(0, 1, norm);
          espressoGroup.scale.set(s, s, s);
          espressoGroup.rotation.y = THREE.MathUtils.lerp(-1.5, 0, norm);
          espressoGroup.position.set(0, 0, 0);
          espressoHousingGroup.position.z = 0;
          boilerEmissiveMaterial.emissiveIntensity = 0;
        } else if (localP < 0.75) {
          const norm = (localP - 0.4) / 0.35;
          espressoGroup.scale.set(1, 1, 1);
          espressoGroup.rotation.y = THREE.MathUtils.lerp(0, 0.4, norm);
          espressoGroup.position.set(0, 0, 0);
          // Exploded view housing shift
          espressoHousingGroup.position.z = THREE.MathUtils.lerp(0, 0.45, norm);
          // Emissive thermal glow 0 -> 4.0
          boilerEmissiveMaterial.emissiveIntensity = THREE.MathUtils.lerp(0, 4.0, norm);
        } else {
          const norm = (localP - 0.75) / 0.25;
          espressoGroup.position.y = THREE.MathUtils.lerp(0, 5, norm);
          espressoGroup.position.z = THREE.MathUtils.lerp(0, -6, norm);
          boilerEmissiveMaterial.emissiveIntensity = THREE.MathUtils.lerp(4.0, 0, norm);
        }
      } else {
        espressoGroup.visible = false;
      }

      // ── SECTION B: PRECISION OVEN (0.33 to 0.66 of overall scroll) ──
      // Stage 1 (0.33 - 0.45): Slides horizontally into center viewport focus
      // Stage 2 (0.45 - 0.58): Front Glass door opacity drops 0.85 -> 0.1 (transparent reveal), wireframe spins
      // Stage 3 (0.58 - 0.66): Slides upward and away
      if (p >= 0.28 && p <= 0.7) {
        const localP = (p - 0.28) / 0.42; // Normalized 0..1 inside Section B
        ovenGroup.visible = true;

        // Spin internal wireframe core continuously
        ovenWireframeCore.rotation.x += 0.015;
        ovenWireframeCore.rotation.y += 0.02;

        if (localP < 0.4) {
          const norm = localP / 0.4;
          ovenGroup.position.x = THREE.MathUtils.lerp(12, 0, norm);
          ovenGroup.position.y = 0;
          ovenGroup.rotation.y = THREE.MathUtils.lerp(0.8, 0, norm);
          smokedGlassMaterial.opacity = 0.85;
        } else if (localP < 0.75) {
          const norm = (localP - 0.4) / 0.35;
          ovenGroup.position.x = 0;
          ovenGroup.position.y = 0;
          ovenGroup.rotation.y = THREE.MathUtils.lerp(0, -0.3, norm);
          // Glass door modifies opacity down to 0.1 (becomes transparent)
          smokedGlassMaterial.opacity = THREE.MathUtils.lerp(0.85, 0.1, norm);
        } else {
          const norm = (localP - 0.75) / 0.25;
          ovenGroup.position.y = THREE.MathUtils.lerp(0, 6, norm);
          ovenGroup.position.x = THREE.MathUtils.lerp(0, -8, norm);
          smokedGlassMaterial.opacity = 0.85;
        }
      } else {
        ovenGroup.visible = false;
      }

      // ── SECTION C: PRESERVATION COLUMN (0.66 to 1.0 of overall scroll) ──
      // Stage 1 (0.66 - 0.78): Rises up from bottom viewport origin into crisp center layout focus
      // Stage 2 (0.78 - 0.90): Left and right French doors pivot open (-1.2 and +1.2 rotation.y)
      // Stage 3 (0.90 - 1.0): Doors close softly, recedes into background darkness
      if (p >= 0.62) {
        const localP = (p - 0.62) / 0.38; // Normalized 0..1 inside Section C
        preservationGroup.visible = true;

        if (localP < 0.4) {
          const norm = localP / 0.4;
          preservationGroup.position.y = THREE.MathUtils.lerp(-10, 0, norm);
          preservationGroup.position.z = THREE.MathUtils.lerp(-4, 0, norm);
          leftDoorPivot.rotation.y = 0;
          rightDoorPivot.rotation.y = 0;
        } else if (localP < 0.78) {
          const norm = (localP - 0.4) / 0.38;
          preservationGroup.position.y = 0;
          preservationGroup.position.z = 0;

          if (!isMobile) {
            // French doors physically pivot open along hinges
            leftDoorPivot.rotation.y = THREE.MathUtils.lerp(0, -1.2, norm);
            rightDoorPivot.rotation.y = THREE.MathUtils.lerp(0, 1.2, norm);
          } else {
            // Simplified mobile single-axis movement to preserve mobile GPU performance
            leftDoorPivot.position.x = THREE.MathUtils.lerp(-1.5, -2.2, norm);
            rightDoorPivot.position.x = THREE.MathUtils.lerp(1.5, 2.2, norm);
          }
        } else {
          const norm = (localP - 0.78) / 0.22;
          if (!isMobile) {
            leftDoorPivot.rotation.y = THREE.MathUtils.lerp(-1.2, 0, norm);
            rightDoorPivot.rotation.y = THREE.MathUtils.lerp(1.2, 0, norm);
          } else {
            leftDoorPivot.position.x = THREE.MathUtils.lerp(-2.2, -1.5, norm);
            rightDoorPivot.position.x = THREE.MathUtils.lerp(2.2, 1.5, norm);
          }
          preservationGroup.position.z = THREE.MathUtils.lerp(0, -8, norm);
          preservationGroup.position.y = THREE.MathUtils.lerp(0, -3, norm);
        }
      } else {
        preservationGroup.visible = false;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. RESIZE HANDLER
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(w < 768 ? 1 : Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // CLEANUP
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      style={{ background: "#0A0A0A" }}
    />
  );
}
