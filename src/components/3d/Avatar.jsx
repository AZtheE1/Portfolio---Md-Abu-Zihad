/*
Enhanced Avaturn Model Component with unified Mixamo animation files.
*/

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Avatar({ animation = 'typing', ...props }) {
  const group = useRef();

  // 1. Load the base Avaturn avatar mesh & skeleton
  const { nodes, materials } = useGLTF('/models/avatar.glb');

  // 2. Load the unified animation files with matched bone names
  const { animations: typingAnimations } = useGLTF('/animations/Typing_fixed.glb');
  const { animations: wavingAnimations } = useGLTF('/animations/Waving_fixed.glb');

  // 3. Combine animation clips into a single array
  const combinedAnimations = [
    ...(typingAnimations || []),
    ...(wavingAnimations || []),
  ];

  // 4. Bind animations to the group ref
  const { actions } = useAnimations(combinedAnimations, group);

  // 5. Automatically play requested animation clip
  useEffect(() => {
    const currentAction = actions[animation] || actions['typing'] || actions[Object.keys(actions)[0]];

    if (currentAction) {
      console.log(`▶️ Avatar now playing action: "${animation}"`);
      currentAction.reset().fadeIn(0.4).play();
    }

    return () => {
      if (currentAction) {
        currentAction.fadeOut(0.4);
      }
    };
  }, [actions, animation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.avaturn_body.geometry}
        material={materials.avaturn_body_material}
        skeleton={nodes.avaturn_body.skeleton}
        castShadow
        receiveShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_glasses_0.geometry}
        material={materials.avaturn_glasses_0_material}
        skeleton={nodes.avaturn_glasses_0.skeleton}
        castShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_glasses_1.geometry}
        material={materials.avaturn_glasses_1_material}
        skeleton={nodes.avaturn_glasses_1.skeleton}
        castShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_hair_0.geometry}
        material={materials.avaturn_hair_0_material}
        skeleton={nodes.avaturn_hair_0.skeleton}
        castShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_hair_1.geometry}
        material={materials.avaturn_hair_1_material}
        skeleton={nodes.avaturn_hair_1.skeleton}
        castShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_shoes_0.geometry}
        material={materials.avaturn_shoes_0_material}
        skeleton={nodes.avaturn_shoes_0.skeleton}
        castShadow
        receiveShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_look_0.geometry}
        material={materials.avaturn_look_0_material}
        skeleton={nodes.avaturn_look_0.skeleton}
        castShadow
      />
    </group>
  );
}

export default Avatar;

useGLTF.preload('/models/avatar.glb');
useGLTF.preload('/animations/Typing_fixed.glb');
useGLTF.preload('/animations/Waving_fixed.glb');