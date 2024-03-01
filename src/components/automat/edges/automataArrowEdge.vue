<template>
  <!-- You can use the `BaseEdge` component to create your own custom edge more easily -->
  <BaseEdge
    @click="togglePopupVisibility()"
    :id="id"
    :style="style"
    :path="source != target ? edgePath[0] : edgePath"
    :marker-end="markerEnd"
  />

  <!-- Use the `EdgeLabelRenderer` to escape the SVG world of edges and render your own custom label in a `<div>` ctx -->
  <EdgeLabelRenderer v-if="source != target">
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -90%) translate(${edgePath[1]}px,${edgePath[2]}px)`,
      }"
      class="nodrag nopan"
    >
      <a>{{ edge.label }}</a>
      <automataPopUpComponent
        v-if="showPopup"
        @closePopup="closePopup"
        :edge-id="id"
        :edgeLabel="label"
      ></automataPopUpComponent>
    </div>
  </EdgeLabelRenderer>
  <EdgeLabelRenderer v-else>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: 'translate(120px, 12px)',
      }"
      class="nodrag nopan"
    >
      <a>{{ edge.label }}</a>
      <automataPopUpComponent
        v-if="showPopup"
        @closePopup="closePopup"
        :edge-id="id"
        :edgeLabel="label"
      ></automataPopUpComponent>
    </div>
  </EdgeLabelRenderer>
</template>
<script setup>
import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  GraphNode,
  Position,
  useVueFlow,
} from "@vue-flow/core";

import { computed, defineProps, ref, watch } from "vue";
import automataPopUpComponent from "../automataPopUpComponent.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: String,
  source: String,
  target: String,
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  sourceNode: GraphNode,
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  targetNode: GraphNode,
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  data: {
    transitions: Array, //Array oder Object?
  },
  markerEnd: {
    type: String,
    required: false,
  },
  markerEndId: String,
  style: {
    type: Object,
    required: false,
  },
});

const instance = useVueFlow();
const { onEdgeClick } = useVueFlow();
const edge = instance.findEdge(props.id);
const showPopup = ref(false);

watch(
  () => edge.data.transitions.map((item) => item.flag),
  () => {
    let lab = "";
    if (edge.data.transitions != null) {
      for (const item of edge.data.transitions) {
        if (item.flag) {
          lab += item.value;
        }
      }
      edge.label = lab;
    }
  },
  { deep: true }
);

const edgePath = computed(() => {
  if (props.source !== props.target && edgeParams.value.sx) {
    const path = getStraightPath({
      sourceX: edgeParams.value.sx,
      sourceY: edgeParams.value.sy,
      targetX: edgeParams.value.tx,
      targetY: edgeParams.value.ty,
      sourcePosition: edgeParams.value.sourcePos,
      targetPosition: edgeParams.value.targetPos,
    });
    // console.log(path);
    return path;
  } else if (props.source === props.target) {
    const { sourceX, sourceY, targetX, targetY } = props;
    const radiusX = (sourceX - targetX) * 0.6;
    const radiusY = 50;
    const edgePath1 = `M ${sourceX} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${targetX} ${targetY}`;
    // console.log(edgePath1);
    return edgePath1;
  } else {
    return "";
  }
});
const edgeParams = computed(() =>
  getEdgeParams(props.sourceNode, props.targetNode)
);
// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
function getEdgeParams(source, target) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}
// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(intersectionNode, targetNode) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const {
    dimensions: {
      width: intersectionNodeWidth,
      height: intersectionNodeHeight,
    },
    computedPosition: intersectionNodePosition,
  } = intersectionNode;
  const targetPosition = targetNode.computedPosition;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + w;
  const y1 = targetPosition.y + h;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node, intersectionPoint) {
  const n = { ...node.computedPosition, ...node.dimensions };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

onEdgeClick(({ edge }) => {
  if (edge.id == props.id) {
    showPopup.value = !showPopup.value;
  }
});
</script>

<style scoped>
.edgebutton {
  border-radius: 50%;
  background: white;
}
</style>
