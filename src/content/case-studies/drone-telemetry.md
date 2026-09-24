---
title: "Autonomous Drone Swarm Telemetry"
description: "Real-time WebGL command center and telemetry visualization dashboard for autonomous UAV fleet coordination."
tags: ["Three.js", "WebSockets", "Rust", "React", "TailwindCSS"]
category: "3D / Graphics"
featured: true
date: "2026-03"
role: "Lead Systems & 3D Engineer"
liveUrl: "https://example.com/drone-telemetry"
githubUrl: "https://github.com/AZtheE1/drone-telemetry"
hologramColor: "#00f0ff"
coordinates:
  x: -1.2
  y: 0.8
  z: -2.1
---

## Overview
Built a 60 FPS 3D telemetry portal orchestrating spatial data streaming from over 50 simultaneously simulated drones using custom binary WebSocket protocols.

### Key Innovations
- **Low-Latency Point Cloud Streaming:** Implemented Web Workers for decoding compressed point clouds without blocking the main render loop.
- **Hardware-Accelerated Instancing:** Rendered 100k+ instanced meshes with spatial LODs (Level of Detail).
