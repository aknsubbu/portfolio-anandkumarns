"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface MatrixCell {
  char: string;
  color: string;
  isFixed: boolean;
  finalChar: string | null;
}

interface GridSize {
  rows: number;
  cols: number;
}

interface CenterPosition {
  centerRow: number;
  textStartCol: number;
}

const EmergingTextAnimation = () => {
  const [matrix, setMatrix] = useState<MatrixCell[][]>([]);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  const finalText = " · Anandkumar · NS";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()·";

  const TEXT_CONFIG = {
    fontSize: "3.5rem",
    charWidth: 24,
    charHeight: 36,
    letterSpacing: "0.25rem",
  };

  // ... (keep all existing functions: getGridSize, getCenterPosition, createMatrix)
  const getGridSize = useCallback((): GridSize => {
    const cols = Math.ceil(window.innerWidth / TEXT_CONFIG.charWidth);
    const rows = Math.ceil(window.innerHeight / TEXT_CONFIG.charHeight);

    return { rows, cols };
  }, []);

  const getCenterPosition = useCallback((): CenterPosition => {
    const { rows, cols } = getGridSize();
    const centerRow = Math.floor(rows / 2);
    const textStartCol = Math.floor((cols - finalText.length) / 2);

    return { centerRow, textStartCol };
  }, [getGridSize, finalText.length]);

  const createMatrix = useCallback(
    (
      size: GridSize,
      position: CenterPosition,
      randomChars: boolean = true
    ): MatrixCell[][] => {
      const { rows, cols } = size;
      const { centerRow, textStartCol } = position;

      return Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => ({
          char: randomChars
            ? characters[Math.floor(Math.random() * characters.length)]
            : " ",
          color: "text-gray-500",
          isFixed: false,
          finalChar:
            rowIndex === centerRow &&
            colIndex >= textStartCol &&
            colIndex < textStartCol + finalText.length
              ? finalText[colIndex - textStartCol]
              : null,
        }))
      );
    },
    [characters, finalText]
  );

  useEffect(() => {
    const initialSize = getGridSize();
    const initialPosition = getCenterPosition();
    const initialMatrix = createMatrix(initialSize, initialPosition);
    setMatrix(initialMatrix);

    const handleResize = () => {
      const newSize = getGridSize();
      const newPosition = getCenterPosition();
      const newMatrix = createMatrix(newSize, newPosition);
      setMatrix(newMatrix);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [getGridSize, getCenterPosition, createMatrix]);

  useEffect(() => {
    const startTime = Date.now();
    const animationDuration = 3000;
    let animationFrameId: number;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      if (elapsed < animationDuration) {
        setMatrix((prevMatrix) =>
          prevMatrix.map((row) =>
            row.map((cell) => {
              if (
                cell.finalChar &&
                !cell.isFixed &&
                Math.random() < 0.1 * progress
              ) {
                return {
                  ...cell,
                  char: cell.finalChar === "·" ? " " : cell.finalChar,
                  color:
                    cell.finalChar === "·" ? "text-transparent" : "text-white",
                  isFixed: true,
                };
              }

              if (!cell.isFixed && Math.random() < 0.1) {
                return {
                  ...cell,
                  char: characters[
                    Math.floor(Math.random() * characters.length)
                  ],
                };
              }

              return cell;
            })
          )
        );

        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Show button after animation completes
        setShowButton(true);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [characters]);

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden font-mono">
      <div
        className="absolute inset-0 w-full h-full flex flex-col justify-center items-stretch"
        style={{
          fontSize: TEXT_CONFIG.fontSize,
          lineHeight: "1.2",
          letterSpacing: TEXT_CONFIG.letterSpacing,
        }}
      >
        {matrix.map((row, i) => (
          <div key={i} className="flex justify-center whitespace-nowrap">
            {row.map((cell, j) => (
              <span
                key={`${i}-${j}`}
                className={`transition-colors duration-300 ${cell.color}`}
              >
                {cell.char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Centered button container */}
      {showButton && (
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none pm-5 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pointer-events-auto" // Re-enable pointer events for the button
          >
            <Button
              onClick={handleClick}
              className="px-8 py-4 text-lg font-bold"
              color="primary"
              variant="shadow"
              radius="full"
              size="lg"
              endContent={
                <div className="ml-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              }
            >
              Crash Course into me
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EmergingTextAnimation;
