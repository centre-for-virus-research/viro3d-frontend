import { useRef, useEffect, useState } from "react";
import Konva from "konva";
import { useGraphData } from "../../hooks/useGraphData";
import { NodeData } from "../../types/graphdata";

type ClusterVisualisationProps = {
  setHoveredVirus: React.Dispatch<React.SetStateAction<string>>;
  handleViewStructurePopUpClick: (event: string) => void;
};

const ClusterVisualisation: React.FC<ClusterVisualisationProps> = ({
  setHoveredVirus,
  handleViewStructurePopUpClick,
}) => {
  const konvaContainerRef = useRef<HTMLDivElement | null>(null);
  const selectedNodeRef = useRef<Konva.Node | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const lastCenterRef = useRef<{ x: number; y: number } | null>(null);
  const lastDistRef = useRef<number>(0);
  const dragStoppedRef = useRef<boolean>(false);

  type Realm =
    | "Riboviria"
    | "Monodnaviria"
    | "Unclassified"
    | "Varidnaviria"
    | "Ribozyviria"
    | "Duplodnaviria";

  const colourKeys: Record<Realm, string> = {
    Riboviria: "#5cb7a8",
    Monodnaviria: "#b87795",
    Unclassified: "gray",
    Varidnaviria: "#ddc454",
    Ribozyviria: "#117733",
    Duplodnaviria: "#8b81b9",
  };

  const { data } = useGraphData();

  const getDistance = (
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

  const getCenter = (
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) => ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  });

  useEffect(() => {
    if (konvaContainerRef.current) {
      const { clientWidth, clientHeight } = konvaContainerRef.current;
      setContainerSize({ width: clientWidth, height: clientHeight });
    }

    const handleResize = () => {
      if (konvaContainerRef.current) {
        const { clientWidth, clientHeight } = konvaContainerRef.current;
        setContainerSize({ width: clientWidth, height: clientHeight });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addNode = (obj: NodeData, layer: Konva.Layer) => {
    const initialRadius = 5; // Initial node size, will be scaled with zoom

    const node = new Konva.Circle({
      x: obj.x,
      y: -obj.y,
      radius: initialRadius,
      fill: colourKeys[obj.Realm as Realm],
      id: obj.id,
      stroke: "black",
      strokeWidth: 0.015,
    });

    node.on("click", () => handleNodeClick(node, layer));
    node.on("tap", () => handleNodeClick(node, layer));

    node.on("mouseover", () => {
      node.moveToTop();
      setHoveredVirus(node.id());
    });

    node.on("mouseout", () => {
      setHoveredVirus("");
    });

    layer.add(node);
  };

  const handleNodeClick = (node: Konva.Node, layer: Konva.Layer) => {
    if (selectedNodeRef.current) {
      (selectedNodeRef.current as unknown as Konva.Circle).strokeWidth(0.015);
      (selectedNodeRef.current as unknown as Konva.Circle).stroke("black");
      (selectedNodeRef.current as unknown as Konva.Circle).zIndex(0);
    }
    const circleNode = node as Konva.Circle;

    circleNode.stroke("orange");
    circleNode.strokeWidth(0.015);
    circleNode.moveToTop();
    selectedNodeRef.current = circleNode;
    layer.batchDraw();
    handleViewStructurePopUpClick(selectedNodeRef?.current?.attrs.id);
  };

  useEffect(() => {
    if (
      konvaContainerRef.current &&
      !stageRef.current &&
      containerSize.width &&
      containerSize.height
    ) {
      const initialScale = 0.7;
      const stage = new Konva.Stage({
        container: konvaContainerRef.current as unknown as HTMLDivElement,
        width: containerSize.width,
        height: containerSize.height,
        draggable: true,
        scale: { x: initialScale, y: initialScale },
      });
      stageRef.current = stage;

      const layer = new Konva.Layer();
      data?.nodes?.forEach((nodeData: NodeData) => addNode(nodeData, layer));
      layer.draw();

      stage.add(layer);

      Konva.hitOnDragEnabled = true;

      // Set initial view to the center of the nodes
      const getCenterPoint = (nodes: NodeData[]): { x: number; y: number } => {
        if (!nodes || nodes.length === 0) return { x: 0, y: 0 };
        const sum = nodes.reduce(
          (acc, node) => {
            acc.x += node.x;
            acc.y += node.y;
            return acc;
          },
          { x: 0, y: 0 }
        );

        return {
          x: sum.x / nodes.length,
          y: sum.y / nodes.length,
        };
      };

      if (data) {
        const centerPoint = getCenterPoint(data?.nodes);
        stage.position({
          x: containerSize.width / 2 - centerPoint.x,
          y: containerSize.height / 2 - centerPoint.y,
        });
      }

      // Define min and max radius values for nodes
      const minRadius = 0.08; // Minimum size for nodes
      const maxRadius = 5; // Maximum size for nodes

      // Wheel event for zooming with constrained node size
      stage.on("wheel", (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.1;
        const oldScale = stage.scaleX();
        const newScale =
          e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

        // Update scale of stage
        stage.scale({ x: newScale, y: newScale });

        // Dynamically adjust node sizes based on zoom level, with min and max limits
        let scaledRadius = 12 / newScale; // Adjust the divisor to change sensitivity
        scaledRadius = Math.max(minRadius, Math.min(scaledRadius, maxRadius)); // Constrain radius

        (layer.getChildren() as Konva.Circle[]).forEach((circle) => {
          circle.radius(scaledRadius);
        });

        const pointerPosition = stage.getPointerPosition();

        if (pointerPosition) {
          // Maintain position based on zoom
          const mousePointTo = {
            x: pointerPosition.x / oldScale - stage.x() / oldScale,
            y: pointerPosition.y / oldScale - stage.y() / oldScale,
          };
          const newPos = {
            x: -(mousePointTo.x - pointerPosition.x / newScale) * newScale,
            y: -(mousePointTo.y - pointerPosition.y / newScale) * newScale,
          };
          stage.position(newPos);
          stage.batchDraw();
        }
      });

      // const minRadius = 0.08; // Minimum size for nodes
      // const maxRadius = 5;   // Maximum size for nodes

      stage.on("touchmove", (e) => {
        e.evt.preventDefault();
        const touch1 = e.evt.touches[0];
        const touch2 = e.evt.touches[1];

        if (
          touch1 &&
          !touch2 &&
          !stage.isDragging() &&
          dragStoppedRef.current
        ) {
          stage.startDrag();
          dragStoppedRef.current = false;
        }

        if (touch1 && touch2) {
          if (stage.isDragging()) {
            dragStoppedRef.current = true;
            stage.stopDrag();
          }

          const p1 = { x: touch1.clientX, y: touch1.clientY };
          const p2 = { x: touch2.clientX, y: touch2.clientY };

          if (!lastCenterRef.current) {
            lastCenterRef.current = getCenter(p1, p2);
            return;
          }
          const newCenter = getCenter(p1, p2);
          const dist = getDistance(p1, p2);

          if (!lastDistRef.current) {
            lastDistRef.current = dist;
          }

          const pointTo = {
            x: (newCenter.x - stage.x()) / stage.scaleX(),
            y: (newCenter.y - stage.y()) / stage.scaleX(),
          };

          const scale = stage.scaleX() * (dist / lastDistRef.current);
          stage.scaleX(scale);
          stage.scaleY(scale);

          // Update each node's radius based on the new scale
          let scaledRadius = 12 / scale; // Adjust sensitivity here
          scaledRadius = Math.max(minRadius, Math.min(scaledRadius, maxRadius)); // Constrain radius

          (layer.getChildren() as Konva.Circle[]).forEach((circle) => {
            circle.radius(scaledRadius);
          });

          const dx = newCenter.x - lastCenterRef.current.x;
          const dy = newCenter.y - lastCenterRef.current.y;

          const newPos = {
            x: newCenter.x - pointTo.x * scale + dx,
            y: newCenter.y - pointTo.y * scale + dy,
          };

          stage.position(newPos);

          lastDistRef.current = dist;
          lastCenterRef.current = newCenter;
          layer.batchDraw(); // Ensure the layer redraws with updated radii
        }
      });

      stage.on("touchend", () => {
        lastDistRef.current = 0;
        lastCenterRef.current = null;
      });
    }
    return () => {
      stageRef.current?.destroy();
      stageRef.current = null;
    };
  }, [containerSize, data]);

  return (
    <div
      ref={konvaContainerRef}
      style={{ width: "100%", height: "100%", backgroundColor: "#f2f2f2" }}
    />
  );
};

export default ClusterVisualisation;
