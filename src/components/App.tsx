import React, { useEffect, useRef, useState } from "react";
import { FaceMesh, InputImage } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import NavBar from "./NavBar";

// Define types for attention metrics
type Direction = "Center" | "Left" | "Right" | "Up" | "Down" | "Off Screen";
type EyeState = "Open" | "Closed" | "Sleepy" | "Yawning";

const FaceLandmarkDetector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Basic states
  const [faceDirection, setFaceDirection] = useState<Direction>("Center");
  const [eyeDirection, setEyeDirection] = useState<Direction>("Center");
  const [isOffScreen, setIsOffScreen] = useState<boolean>(false);

  // Attention analytics
  const [faceLeftCount, setFaceLeftCount] = useState<number>(0);
  const [faceRightCount, setFaceRightCount] = useState<number>(0);
  const [faceUpCount, setFaceUpCount] = useState<number>(0);
  const [faceDownCount, setFaceDownCount] = useState<number>(0);

  const [eyeLeftCount, setEyeLeftCount] = useState<number>(0);
  const [eyeRightCount, setEyeRightCount] = useState<number>(0);
  const [eyeUpCount, setEyeUpCount] = useState<number>(0);
  const [eyeDownCount, setEyeDownCount] = useState<number>(0);
  const [sleepyCount, setSleepyCount] = useState<number>(0);

  // Previous states for transition detection
  const prevFaceDirection = useRef<Direction>("Center");
  const prevEyeDirection = useRef<Direction>("Center");
  const prevEyeStatus = useRef<EyeState>("Open");

  // Temporal counters for yawn and sleepy detection
  const sleepyFrameCount = useRef<number>(0);
  const yawnFrameCount = useRef<number>(0);
  const offScreenFrameCount = useRef<number>(0);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.3, // Lowered for better detection in low light
      minTrackingConfidence: 0.3, // Lowered for better tracking in low light
    });

    // For more stable detection with less jitter - smaller buffer for faster response
    const bufferSize = 2; // Reduced buffer size for more responsive detection
    const faceXBuffer: number[] = Array(bufferSize).fill(0.5);
    const faceYBuffer: number[] = Array(bufferSize).fill(0.5);
    const eyeXBuffer: number[] = Array(bufferSize).fill(0.5);
    const eyeYBuffer: number[] = Array(bufferSize).fill(0.5);
    const mouthOpenBuffer: number[] = Array(bufferSize).fill(0);

    const updateBuffer = (buffer: number[], value: number): number => {
      buffer.shift();
      buffer.push(value);
      return buffer.reduce((sum, val) => sum + val, 0) / buffer.length;
    };

    faceMesh.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      // Simplified drawing - minimal processing since video is hidden
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      // Check if face is detected
      if (
        !results.multiFaceLandmarks ||
        results.multiFaceLandmarks.length === 0
      ) {
        offScreenFrameCount.current += 1;

        // Consider face off screen after 5 frames (more responsive)
        if (offScreenFrameCount.current > 5) {
          setIsOffScreen(true);
          setFaceDirection("Off Screen");
          setEyeDirection("Off Screen");
        }
        return;
      }

      // Face is detected
      offScreenFrameCount.current = 0;
      setIsOffScreen(false);

      const landmarks = results.multiFaceLandmarks[0];

      // 1. Face direction detection - kept the same
      const noseTip = landmarks[1]; // Nose tip
      if (noseTip) {
        const smoothedX = updateBuffer(faceXBuffer, noseTip.x);
        const smoothedY = updateBuffer(faceYBuffer, noseTip.y);

        let newFaceDirection: Direction = "Center";
        if (smoothedX < 0.45) newFaceDirection = "Left";
        else if (smoothedX > 0.55) newFaceDirection = "Right";
        else if (smoothedY < 0.45) newFaceDirection = "Up";
        else if (smoothedY > 0.55) newFaceDirection = "Down";

        // Update counts when direction changes
        if (newFaceDirection !== prevFaceDirection.current) {
          if (newFaceDirection === "Left") setFaceLeftCount((prev) => prev + 1);
          else if (newFaceDirection === "Right")
            setFaceRightCount((prev) => prev + 1);
          else if (newFaceDirection === "Up")
            setFaceUpCount((prev) => prev + 1);
          else if (newFaceDirection === "Down")
            setFaceDownCount((prev) => prev + 1);

          prevFaceDirection.current = newFaceDirection;
        }

        setFaceDirection(newFaceDirection);
      }

      // 2. Eye status detection
      const leftEyeTop = landmarks[159];
      const leftEyeBottom = landmarks[145];
      const rightEyeTop = landmarks[386];
      const rightEyeBottom = landmarks[374];

      if (leftEyeTop && leftEyeBottom && rightEyeTop && rightEyeBottom) {
        const leftEyeHeight = Math.abs(leftEyeBottom.y - leftEyeTop.y);
        const rightEyeHeight = Math.abs(rightEyeBottom.y - rightEyeTop.y);

        // Adaptive threshold based on face size
        const foreHead = landmarks[10];
        const chin = landmarks[152];
        const faceHeight = Math.abs(foreHead.y - chin.y);
        const eyeClosedThreshold = faceHeight * 0.018;
        const eyeSleepyThreshold = faceHeight * 0.022;

        let newEyeStatus: EyeState = "Open";

        if (
          leftEyeHeight < eyeClosedThreshold &&
          rightEyeHeight < eyeClosedThreshold
        ) {
          newEyeStatus = "Closed";
          sleepyFrameCount.current += 1;

          // Detect sleepy eyes (eyes closed for extended period)
          if (sleepyFrameCount.current > 30) {
            // About 1 second
            newEyeStatus = "Sleepy";
            if (prevEyeStatus.current !== "Sleepy")
              setSleepyCount((prev) => prev + 1);
          }
        } else if (
          leftEyeHeight < eyeSleepyThreshold &&
          rightEyeHeight < eyeSleepyThreshold
        ) {
          newEyeStatus = "Sleepy";
          sleepyFrameCount.current += 1;

          // About 3 seconds
          if (sleepyFrameCount.current > 90)
            if (prevEyeStatus.current !== "Sleepy")
              setSleepyCount((prev) => prev + 1);
        } else {
          sleepyFrameCount.current = 0;
          newEyeStatus = "Open";
        }
        prevEyeStatus.current = newEyeStatus;
      }

      // 3. eye direction detection
      // Using multiple landmark points for more robust detection
      const leftIris = landmarks[468]; // Left iris center
      const rightIris = landmarks[473]; // Right iris center

      // Get expanded set of eye corner landmarks for better relative positioning
      const leftEyeOuterCorner = landmarks[33];
      const leftEyeInnerCorner = landmarks[133];
      const rightEyeInnerCorner = landmarks[362];
      const rightEyeOuterCorner = landmarks[263];

      if (
        leftIris &&
        rightIris &&
        leftEyeOuterCorner &&
        leftEyeInnerCorner &&
        rightEyeInnerCorner &&
        rightEyeOuterCorner
      ) {
        // Calculate normalized positions with wider range points
        const leftEyeWidth = Math.abs(
          leftEyeInnerCorner.x - leftEyeOuterCorner.x
        );
        const rightEyeWidth = Math.abs(
          rightEyeOuterCorner.x - rightEyeInnerCorner.x
        );

        // Calculate horizontal position (where is iris compared to eye corners)
        // For left eye: value close to 0 = looking left, close to 1 = looking right
        const leftIrisRelativeX =
          (leftIris.x - leftEyeOuterCorner.x) / leftEyeWidth;

        // For right eye: value close to 0 = looking left, close to 1 = looking right
        const rightIrisRelativeX =
          (rightIris.x - rightEyeInnerCorner.x) / rightEyeWidth;

        // Vertical position - improved with better landmarks
        const leftEyeTopLid = landmarks[159]; // Upper eyelid
        const leftEyeBottomLid = landmarks[145]; // Lower eyelid
        const rightEyeTopLid = landmarks[386]; // Upper eyelid
        const rightEyeBottomLid = landmarks[374]; // Lower eyelid

        // Calculate normalized vertical positions
        const leftEyeHeight = Math.abs(leftEyeBottomLid.y - leftEyeTopLid.y);
        const rightEyeHeight = Math.abs(rightEyeBottomLid.y - rightEyeTopLid.y);

        // For vertical: value close to 0 = looking up, close to 1 = looking down
        const leftIrisRelativeY =
          (leftIris.y - leftEyeTopLid.y) / leftEyeHeight;
        const rightIrisRelativeY =
          (rightIris.y - rightEyeTopLid.y) / rightEyeHeight;

        // Weight the left and right eyes slightly differently
        // Eyes typically move together but may have small differences
        const avgIrisRelativeX =
          leftIrisRelativeX * 0.5 + rightIrisRelativeX * 0.5;
        const avgIrisRelativeY =
          leftIrisRelativeY * 0.5 + rightIrisRelativeY * 0.5;

        // Smooth the values
        const smoothedEyeX = updateBuffer(eyeXBuffer, avgIrisRelativeX);
        const smoothedEyeY = updateBuffer(eyeYBuffer, avgIrisRelativeY);

        // Debug info on canvas (hidden but useful for development)
        ctx.fillStyle = "blue";
        ctx.fillText(
          `Eye X: ${smoothedEyeX.toFixed(2)}, Y: ${smoothedEyeY.toFixed(2)}`,
          10,
          30
        );
        ctx.fillText(
          `Left Eye X: ${leftIrisRelativeX.toFixed(
            2
          )}, Right Eye X: ${rightIrisRelativeX.toFixed(2)}`,
          10,
          50
        );

        // MORE SENSITIVE thresholds for eye direction
        // Adjusted values for better detection
        let newEyeDirection: Direction = "Center";
        if (smoothedEyeX < 0.4) newEyeDirection = "Left";
        else if (smoothedEyeX > 0.6) newEyeDirection = "Right";
        else if (smoothedEyeY < 0.35) newEyeDirection = "Up";
        else if (smoothedEyeY > 0.6) newEyeDirection = "Down";

        // Update counts when eye direction changes - only if not sleepy or yawning
        if (newEyeDirection !== prevEyeDirection.current) {
          if (newEyeDirection === "Left") setEyeLeftCount((prev) => prev + 1);
          else if (newEyeDirection === "Right")
            setEyeRightCount((prev) => prev + 1);
          else if (newEyeDirection === "Up") setEyeUpCount((prev) => prev + 1);
          else if (newEyeDirection === "Down")
            setEyeDownCount((prev) => prev + 1);
          prevEyeDirection.current = newEyeDirection;
        }
        setEyeDirection(newEyeDirection);
      }

      // 4. Yawn detection - more sensitive
      // Using more mouth landmarks for better detection
      const upperLipTop = landmarks[13]; // Upper lip top
      const lowerLipBottom = landmarks[14]; // Lower lip bottom
      // Add more points for better detection
      const mouthLeft = landmarks[61]; // Left corner of mouth
      const mouthRight = landmarks[291]; // Right corner of mouth

      if (upperLipTop && lowerLipBottom && mouthLeft && mouthRight) {
        // Measure vertical mouth opening
        const mouthHeight = Math.abs(lowerLipBottom.y - upperLipTop.y);
        // Measure horizontal mouth width for normalization
        const mouthWidth = Math.abs(mouthRight.x - mouthLeft.x);

        // Get face height for normalization
        const foreHead = landmarks[10];
        const chin = landmarks[152];
        const faceHeight = Math.abs(foreHead.y - chin.y);

        // Calculate mouth openness as height/width ratio AND relative to face
        const mouthAspectRatio = mouthHeight / mouthWidth;
        const mouthOpenRatio = mouthHeight / faceHeight;

        // Combine metrics for more robust detection
        const yawnMetric = mouthOpenRatio * 5 + mouthAspectRatio;
        const smoothedYawnMetric = updateBuffer(mouthOpenBuffer, yawnMetric);

        // Debug on canvas
        ctx.fillText(`Mouth open: ${smoothedYawnMetric.toFixed(3)}`, 10, 70);
        ctx.fillText(`MAR: ${mouthAspectRatio.toFixed(3)}`, 10, 90);

        // Track yawn state with a boolean flag approach
        if (smoothedYawnMetric > 0.12) {
          // Mouth open wide enough for yawn
          // If we haven't already counted this yawn and have enough frames to confirm it's a yawn
          if (
            yawnFrameCount.current >= 15 &&
            prevEyeStatus.current !== "Yawning"
          ) {
            prevEyeStatus.current = "Yawning"; // Mark this yawn as counted
          }

          // Keep incrementing frame count until we reach our threshold
          if (yawnFrameCount.current < 15) yawnFrameCount.current += 1;
        } else {
          // Mouth is closed or closing
          if (yawnFrameCount.current > 0) yawnFrameCount.current -= 1;

          // Only restore previous state when yawn is fully finished
          if (
            yawnFrameCount.current === 0 &&
            prevEyeStatus.current === "Yawning"
          )
            prevEyeStatus.current = "Open"; // Allow next yawn to be counted
        }
      }
    });

    // Simplified camera setup with lower resolution for better performance
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current as InputImage });
      },
      width: 640, // Lower resolution
      height: 480, // Lower resolution
      facingMode: "user", // Ensure front camera is used
    });
    camera.start();

    return () => {
      camera.stop();
      faceMesh.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <NavBar />
      {/* Keep video hidden */}
      <video
        ref={videoRef}
        className="block mt-16"
        autoPlay
        playsInline
      ></video>
      <canvas
        ref={canvasRef}
        className="mt-20 hidden justify-center w-8/12 h-[500px] border-2 border-gray-300 rounded-lg"
      />

      <div className="mt-20 w-8/12 flex flex-col items-center gap-3">
        {/* Status indicators - keeping these the same */}
        <div
          className={`w-full ${
            isOffScreen ? "bg-red-500" : "bg-green-500"
          } rounded-lg p-3 text-center font-bold`}
        >
          User Attention: {isOffScreen ? "OFF SCREEN" : "PRESENT"}
        </div>
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="col-span-1 border">
            <div className=" rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Face Analysis</h3>
              <div className=" rounded p-2 mb-2">
                Face Direction:{" "}
                <span className="font-semibold">{faceDirection}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className=" p-2 rounded">Left: {faceLeftCount}</div>
                <div className=" p-2 rounded">Right: {faceRightCount}</div>
                <div className=" p-2 rounded">Up: {faceUpCount}</div>
                <div className=" p-2 rounded">Down: {faceDownCount}</div>
              </div>
            </div>
          </div>

          <div className="col-span-1 border">
            <div className="rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Eye Analysis</h3>
              <div className=" rounded p-2 mb-2">
                Eye Direction:{" "}
                <span className="font-semibold">{eyeDirection}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className=" p-2 rounded">Left: {eyeLeftCount}</div>
                <div className=" p-2 rounded">Right: {eyeRightCount}</div>
                <div className=" p-2 rounded">Up: {eyeUpCount}</div>
                <div className=" p-2 rounded">Down: {eyeDownCount}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-2 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Attention Metrics</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className=" rounded p-3 text-center">
              <div className="text-xl font-bold">{prevEyeStatus.current}</div>
              <div className="text-sm text-gray-500">Eye Status</div>
            </div>

            <div className=" rounded p-3 text-center">
              <div className="text-xl font-bold">{sleepyCount}</div>
              <div className="text-sm text-gray-500">Sleepiness Detected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceLandmarkDetector;
