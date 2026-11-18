import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PROJECTS } from './data/portfolio';

// Real Vera app screens, shown on the phone in rotation.
const PHONE_SCREENS = ['/img/vera-screen-today.png', '/img/vera-screen-tasks.png'];

const shadowTexture = () => {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(0,0,0,0.45)'); grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad; g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
};

export default function Scene3D() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = matchMedia('(pointer: coarse)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.className = 'absolute inset-0 w-full h-full';
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(3, 5, 4);
    scene.add(sun);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(1.0, 2.3, 6.1);

    const aluminium = new THREE.MeshStandardMaterial({ color: 0xc9c4bb, metalness: 0.85, roughness: 0.35 });
    const graphite = new THREE.MeshStandardMaterial({ color: 0x1b1a19, metalness: 0.6, roughness: 0.4 });
    const loader = new THREE.TextureLoader();

    // Laptop
    const laptop = new THREE.Group();
    const base = new THREE.Mesh(new RoundedBoxGeometry(3.2, 0.1, 2.2, 4, 0.05), aluminium);
    const deck = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.1), new THREE.MeshStandardMaterial({ color: 0x2a2826, roughness: 0.8 }));
    deck.rotation.x = -Math.PI / 2; deck.position.set(0, 0.051, -0.3);
    const pad = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.6), new THREE.MeshStandardMaterial({ color: 0xb5afa5, metalness: 0.7, roughness: 0.3 }));
    pad.rotation.x = -Math.PI / 2; pad.position.set(0, 0.051, 0.6);
    laptop.add(base, deck, pad);

    const lid = new THREE.Group();
    lid.position.set(0, 0.05, -1.1);
    lid.rotation.x = -0.28;
    const shell = new THREE.Mesh(new RoundedBoxGeometry(3.2, 2.1, 0.07, 4, 0.03), graphite);
    shell.position.y = 1.05;
    const screenTex = loader.load(PROJECTS[0].image);
    screenTex.colorSpace = THREE.SRGBColorSpace;
    screenTex.anisotropy = 8;
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.9), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }));
    screen.position.set(0, 1.05, 0.036);
    lid.add(shell, screen);
    laptop.add(lid);
    scene.add(laptop);

    // Phone
    const phone = new THREE.Group();
    const phoneBody = new THREE.Mesh(new RoundedBoxGeometry(0.95, 1.95, 0.09, 6, 0.12), graphite);
    const phoneTexes = PHONE_SCREENS.map((src) => {
      const t = loader.load(src);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      return t;
    });
    const phoneMat = new THREE.MeshBasicMaterial({ map: phoneTexes[0], transparent: true, toneMapped: false });
    const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 1.876), phoneMat);
    phoneScreen.position.z = 0.047;
    phone.add(phoneBody, phoneScreen);
    phone.position.set(1.95, 1.05, 0.9);
    phone.rotation.set(-0.05, -0.4, 0.04);
    scene.add(phone);
    let shown = 0;
    const cycle = setInterval(() => { shown = (shown + 1) % phoneTexes.length; phoneMat.map = phoneTexes[shown]; }, 3500);

    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2; shadow.position.set(0.4, -0.06, 0.2);
    scene.add(shadow);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0.4, 0.8, 0);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = !touch; // keep page scroll on phones
    controls.enableDamping = true;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.6;
    controls.minPolarAngle = 0.9; controls.maxPolarAngle = 1.4;
    controls.minAzimuthAngle = -0.9; controls.maxAzimuthAngle = 0.9;
    // ping-pong the auto-rotate between the azimuth limits
    controls.addEventListener('change', () => {
      const a = controls.getAzimuthalAngle();
      if (a > 0.6) controls.autoRotateSpeed = Math.abs(controls.autoRotateSpeed);
      if (a < -0.6) controls.autoRotateSpeed = -Math.abs(controls.autoRotateSpeed);
    });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Only render while visible.
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      if (!visible) return;
      if (!reduced) phone.position.y = 1.05 + Math.sin(clock.getElapsedTime() * 1.1) * 0.07;
      controls.update();
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      clearInterval(cycle);
      ro.disconnect(); io.disconnect(); controls.dispose(); pmrem.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const m = o.material as THREE.MeshBasicMaterial;
          m.map?.dispose(); m.dispose();
        }
      });
      phoneTexes.forEach((t) => t.dispose());
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={host}
      className="relative w-full min-w-0 aspect-[4/3] cursor-grab active:cursor-grabbing rise"
      role="img"
      aria-label="3D laptop showing ClientFlow and phone showing the Vera app"
    />
  );
}
