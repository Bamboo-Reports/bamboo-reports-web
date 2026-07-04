import { useEffect, type ButtonHTMLAttributes, type MouseEvent } from "react";

const APPOINTMENT_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3VtT1tkXcAkAXo3Gm2G3GLC2CyAx34gJIi6ZS889-Oe6GmZTkA9zKqvQbhBQYTRBV_BFQA2-8o?gv=true";
const SCRIPT_SRC =
  "https://calendar.google.com/calendar/scheduling-button-script.js";
const STYLESHEET_SRC =
  "https://calendar.google.com/calendar/scheduling-button-script.css";

type GoogleCalendarWindow = Window & {
  calendar?: {
    schedulingButton?: {
      load: (config: {
        url: string;
        color: string;
        label: string;
        target: HTMLElement;
      }) => void;
    };
  };
};

let scriptPromise: Promise<void> | null = null;
let popupTrigger: HTMLButtonElement | null = null;

const ensureSchedulingAssets = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.resolve();
  }

  if (!document.querySelector(`link[href="${STYLESHEET_SRC}"]`)) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = STYLESHEET_SRC;
    document.head.appendChild(stylesheet);
  }

  const googleCalendarWindow = window as GoogleCalendarWindow;
  if (googleCalendarWindow.calendar?.schedulingButton) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise<void>((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );

    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }

    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Google Calendar scheduling script failed to load")),
      { once: true }
    );
  });

  return scriptPromise;
};

const getPopupTrigger = async () => {
  if (popupTrigger?.isConnected) {
    return popupTrigger;
  }

  await ensureSchedulingAssets();

  const googleCalendarWindow = window as GoogleCalendarWindow;
  const schedulingButton = googleCalendarWindow.calendar?.schedulingButton;
  if (!schedulingButton) {
    throw new Error("Google Calendar scheduling API is unavailable");
  }

  const target = document.createElement("span");
  target.hidden = true;
  document.body.appendChild(target);

  schedulingButton.load({
    url: APPOINTMENT_URL,
    color: "#017abf",
    label: "Map Your GCC Universe",
    target,
  });

  popupTrigger = target.nextElementSibling as HTMLButtonElement | null;
  if (!popupTrigger) {
    target.remove();
    throw new Error("Google Calendar scheduling button was not created");
  }

  popupTrigger.hidden = true;
  popupTrigger.style.display = "none";
  popupTrigger.tabIndex = -1;
  popupTrigger.setAttribute("aria-hidden", "true");

  return popupTrigger;
};

const openGoogleCalendarScheduler = async () => {
  try {
    const trigger = await getPopupTrigger();
    trigger.click();
  } catch {
    window.open(APPOINTMENT_URL, "_blank", "noopener,noreferrer");
  }
};

type GoogleCalendarSchedulingButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement>;

export const GoogleCalendarSchedulingButton = ({
  onClick,
  type = "button",
  ...props
}: GoogleCalendarSchedulingButtonProps) => {
  useEffect(() => {
    void ensureSchedulingAssets().catch(() => undefined);
  }, []);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      void openGoogleCalendarScheduler();
    }
  };

  return <button {...props} type={type} onClick={handleClick} />;
};
