export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "off" | "on";

export const useChatty = () => {
  return (level: LogLevel, ...payload: string[]) => {
    window.api.util.log(level, payload);
  };
};
