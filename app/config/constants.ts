/**
 * 서버주소 타입
 */
export const ServerUrlType = {
  BARO: process.env.NEXT_PUBLIC_BARO_URL,
  APIS: process.env.NEXT_PUBLIC_APIS_URL,
  EDGE: process.env.NEXT_PUBLIC_EDGE_API_URL,
  WEBSOCKET: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
} as const;
export type ServerUrlType = (typeof ServerUrlType)[keyof typeof ServerUrlType];

/**
 * 머신상태타입
 */
export const MachineExecutionType = {
  ACTIVE: "ACTIVE",
  OFF: "POWER_OFF",
  READY: "READY",
  TRIGGERED: "TRIGGERED",
  STOPPED: "STOPPED",
  INTERRUPTED: "INTERRUPTED",
} as const;
export type MachineExecutionType =
  (typeof MachineExecutionType)[keyof typeof MachineExecutionType];

/**
 * 기계 상황별 색상 타입
 */
export const MachineColorType = {
  ACTIVE: "#2f983e",
  POWER_OFF: "#777",
  READY: "#f2994a",
  TRIGGERED: "#d11313",
  STOPPED: "#f2994a",
  INTERRUPTED: "#f2994a",
} as const;
export type MachineColorType =
  (typeof MachineColorType)[keyof typeof MachineColorType];

/**
 * 기계 상황별 텍스트 타입
 */
export const MachineTextType = {
  ACTIVE: "가공 중",
  READY: "대기 중",
  POWER_OFF: "전원꺼짐",
  TRIGGERED: "수정 중",
  STOPPED: "가공완료",
  INTERRUPTED: "수정 중",
} as const;
export type MachineTextType =
  (typeof MachineTextType)[keyof typeof MachineTextType];

/**
 * 특수 블럭 코드 타입
 */
export const ExceptionBlockType = {
  PAUSE: ["M0", "M00", "M1", "M01", "M61", "M62"],
  PALETTE: ["M61", "M62"],
} as const;
export type ExceptionBlockType =
  (typeof ExceptionBlockType)[keyof typeof ExceptionBlockType];
