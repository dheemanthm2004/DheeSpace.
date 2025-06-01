






import React from 'react'
import { motion } from 'framer-motion'
import stringToColor from '@/lib/stringToColor'

function FollowPointer({ x, y, info }: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const color = stringToColor(info.email || '1')

  return (
    <motion.div
      className="follow-pointer absolute z-50"
      style={{ top: y - 40, left: x - 16, pointerEvents: 'none' }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <motion.div
        className="flex items-center gap-2 px-3 py-1 rounded-full shadow-md"
        style={{
          backgroundColor: '#fff',
          border: `2px solid ${color}`,
          color: '#333',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        <img
          src={info.avatar}
          alt={info.name}
          className="w-5 h-5 rounded-full object-cover border border-white"
        />
        <span>{info?.name}</span>
      </motion.div>

      {/* Pointer Arrow */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        style={{
          fill: color,
          transform: 'rotate(-70deg)',
          marginLeft: '-3px',
          marginTop: '-35px',
        }}
        width="16"
        height="16"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916a5.657 5.657 0 0 1 .556.103z" />
      </motion.svg>
    </motion.div>
  )
}

export default FollowPointer
