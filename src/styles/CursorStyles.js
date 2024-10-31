import React from 'react'
import { PhingerCursor } from '@cursorify/cursors'

export const cursorOptions = {
  cursor: <PhingerCursor />,
  opacity: 1,
  delay: 1,
  defaultCursorVisible: false,
  breakpoint: 997
}

// You can customize the Phinger cursor with these options:
// size: controls the size of the cursor
// color: changes the color of the cursor
// speed: adjusts how quickly the cursor follows the mouse
// The hover state will make the cursor slightly larger when hovering over interactive elements 