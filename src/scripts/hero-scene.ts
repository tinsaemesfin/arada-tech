import * as THREE from 'three';

export function initHeroScene(canvas: HTMLCanvasElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas, alpha: true, antialias: true, powerPreference: 'high-performance',
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const wiremat = (color: number, opacity: number): THREE.MeshBasicMaterial =>
    new THREE.MeshBasicMaterial({
      color, wireframe: true, transparent: true, opacity,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });

  // ── Particles ──────────────────────────────────────────────
  const P_COUNT = 180;
  const SPREAD = 22;
  const pos = new Float32Array(P_COUNT * 3);
  const vel: THREE.Vector3[] = [];

  for (let i = 0; i < P_COUNT; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * SPREAD;
    pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
    pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 0.5;
    vel.push(new THREE.Vector3(
      (Math.random() - 0.5) * 0.005,
      (Math.random() - 0.5) * 0.005,
      (Math.random() - 0.5) * 0.003,
    ));
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    size: 0.05, color: 0x8899dd, transparent: true, opacity: 0.6,
    sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
  })));

  // ── Connection lines ───────────────────────────────────────
  const lineGeo = new THREE.BufferGeometry();
  const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
    color: 0x5567bf, transparent: true, opacity: 0.08,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(lines);

  // ── Central icosahedron + glow shell ───────────────────────
  const main = new THREE.Mesh(new THREE.IcosahedronGeometry(2.5, 2), wiremat(0x2a357d, 0.14));
  const glowShell = new THREE.Mesh(new THREE.IcosahedronGeometry(2.9, 1), wiremat(0x5567bf, 0.04));
  scene.add(main, glowShell);

  // ── Inner accent octahedron ────────────────────────────────
  const inner = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), wiremat(0xef7b22, 0.18));
  scene.add(inner);

  // ── Orbiting torus rings ───────────────────────────────────
  const ringCfg = [
    { r: 3.8, tube: 0.02, c: 0x5567bf, o: 0.1,  rx: 0.3,  rz: 0.1  },
    { r: 4.5, tube: 0.015, c: 0xef7b22, o: 0.06, rx: -0.25, rz: 0.2  },
    { r: 5.4, tube: 0.01, c: 0x8899dd, o: 0.04, rx: 0.5,  rz: -0.15 },
  ];
  const rings = ringCfg.map(c => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(c.r, c.tube, 8, 80), wiremat(c.c, c.o));
    m.rotation.set(Math.PI * c.rx, 0, Math.PI * c.rz);
    scene.add(m);
    return m;
  });

  // ── Small orbiting shapes ──────────────────────────────────
  const orbitGeos = [
    new THREE.TetrahedronGeometry(0.25),
    new THREE.BoxGeometry(0.3, 0.3, 0.3),
    new THREE.OctahedronGeometry(0.2),
    new THREE.DodecahedronGeometry(0.2),
  ];
  const orbiters = Array.from({ length: 8 }, (_, i) => {
    const m = new THREE.Mesh(orbitGeos[i % 4], wiremat(i % 3 === 0 ? 0xef7b22 : 0x5567bf, 0.2));
    scene.add(m);
    return {
      mesh: m,
      angle: (i / 8) * Math.PI * 2,
      radius: 5 + Math.random() * 2.5,
      speed: 0.06 + Math.random() * 0.1,
      yBase: (Math.random() - 0.5) * 3,
    };
  });

  camera.position.set(0, 0.5, 9);

  let mouseX = 0, mouseY = 0, tX = 0, tY = 0, time = 0, frame = 0;

  const setPointer = (px: number, py: number) => {
    mouseX = (px / window.innerWidth) * 2 - 1;
    mouseY = -(py / window.innerHeight) * 2 + 1;
  };
  const onMouse = (e: MouseEvent) => setPointer(e.clientX, e.clientY);
  const onTouch = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) setPointer(t.clientX, t.clientY);
  };

  function updateLines() {
    const arr: number[] = [];
    const maxSq = 11;
    const p = pGeo.getAttribute('position');
    let n = 0;
    for (let i = 0; i < P_COUNT && n < 220; i++) {
      for (let j = i + 1; j < P_COUNT && n < 220; j++) {
        const dx = p.getX(i) - p.getX(j);
        const dy = p.getY(i) - p.getY(j);
        const dz = p.getZ(i) - p.getZ(j);
        if (dx * dx + dy * dy + dz * dz < maxSq) {
          arr.push(p.getX(i), p.getY(i), p.getZ(i), p.getX(j), p.getY(j), p.getZ(j));
          n++;
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
  }

  function animate() {
    requestAnimationFrame(animate);
    time += 0.008;
    frame++;

    tX += (mouseX - tX) * 0.04;
    tY += (mouseY - tY) * 0.04;

    const breathe = 1 + Math.sin(time * 0.6) * 0.06;
    main.rotation.set(time * 0.12 + tY * 0.4, time * 0.18 + tX * 0.4, 0);
    main.scale.setScalar(breathe);

    glowShell.rotation.copy(main.rotation);
    glowShell.scale.setScalar(breathe * 1.08);

    inner.rotation.set(-time * 0.2, -time * 0.25, time * 0.08);
    inner.scale.setScalar(1 + Math.sin(time * 0.8 + 1) * 0.08);

    rings[0].rotation.z += 0.001;
    rings[1].rotation.z -= 0.0008;
    rings[2].rotation.z += 0.0005;

    for (const o of orbiters) {
      o.angle += o.speed * 0.008;
      o.mesh.position.set(
        Math.cos(o.angle) * o.radius,
        o.yBase + Math.sin(time * 0.5 + o.angle) * 1,
        Math.sin(o.angle) * o.radius * 0.4,
      );
      o.mesh.rotation.x += 0.008;
      o.mesh.rotation.y += 0.012;
    }

    const p = pGeo.getAttribute('position');
    const h = SPREAD / 2, hz = h * 0.5;
    for (let i = 0; i < P_COUNT; i++) {
      const v = vel[i];
      let x = p.getX(i) + v.x, y = p.getY(i) + v.y, z = p.getZ(i) + v.z;
      if (Math.abs(x) > h)  v.x *= -1;
      if (Math.abs(y) > h)  v.y *= -1;
      if (Math.abs(z) > hz) v.z *= -1;
      p.setXYZ(i, x, y, z);
    }
    p.needsUpdate = true;

    if (frame % 5 === 0) updateLines();

    camera.position.x += (tX * 2 - camera.position.x) * 0.015;
    camera.position.y += (tY + 0.5 - camera.position.y) * 0.015;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  const onResize = () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  };

  window.addEventListener('mousemove', onMouse, { passive: true });
  window.addEventListener('touchmove', onTouch, { passive: true });
  window.addEventListener('resize', onResize);
  animate();

  return () => {
    window.removeEventListener('mousemove', onMouse);
    window.removeEventListener('touchmove', onTouch);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
  };
}
