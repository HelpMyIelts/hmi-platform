import { Circle, Path, Rect, Svg } from 'react-native-svg';

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const strokeProps = (color: string, strokeWidth: number) => ({
  fill: 'none' as const,
  stroke: color,
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export function BackChevronIcon({ size = 22, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M19 12H5M11 6l-6 6 6 6" />
    </Svg>
  );
}

export function FlameIcon({ size = 16, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M12 2c2 4-3 5-3 9a5 5 0 0010 0c0-2.5-1.5-4-2.5-6 .5 3-1 4-1.5 2.5C14.5 6 13 4 12 2Z" />
    </Svg>
  );
}

export function ListeningIcon({ size = 26, color = '#000', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M4 13v-1a8 8 0 0116 0v1" />
      <Rect x={3} y={13} width={4} height={7} rx={1.5} />
      <Rect x={17} y={13} width={4} height={7} rx={1.5} />
    </Svg>
  );
}

export function ReadingIcon({ size = 26, color = '#000', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M12 6.5c-1.5-1.3-4-2-7-2v13c3 0 5.5.7 7 2 1.5-1.3 4-2 7-2V4.5c-3 0-5.5.7-7 2Z" />
      <Path d="M12 6.5v13" />
    </Svg>
  );
}

export function WritingIcon({ size = 26, color = '#000', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M4 20l4.4-.9L19 8.5a2 2 0 000-2.8l-.7-.7a2 2 0 00-2.8 0L5 15.6 4 20Z" />
    </Svg>
  );
}

export function SpeakingIcon({ size = 26, color = '#000', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Rect x={9} y={3} width={6} height={11} rx={3} />
      <Path d="M5 11a7 7 0 0014 0M12 18v3" />
    </Svg>
  );
}

export function VocabularyIcon({ size = 26, color = '#000', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <Path d="M3 13l9 5 9-5" />
    </Svg>
  );
}

export function GrammarIcon({ size = 26, color = '#000', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Rect x={3} y={3} width={18} height={18} rx={2} />
      <Path d="M7 12l3 3 6-6" />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 18, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M9 6l6 6-6 6" />
    </Svg>
  );
}

export function CheckIcon({ size = 13, color = '#000', strokeWidth = 2.4 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M20 6L9 17l-5-5" />
    </Svg>
  );
}

export function PlusIcon({ size = 15, color = '#000', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function HomeIcon({ size = 20, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M3 10.5 12 3l9 7.5" />
      <Path d="M5 9.5V21h14V9.5" />
    </Svg>
  );
}

export function PlanIcon({ size = 20, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Rect x={3} y={5} width={18} height={16} rx={1} />
      <Path d="M3 9h18M8 3v4M16 3v4" />
    </Svg>
  );
}

export function ProfileIcon({ size = 20, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Circle cx={12} cy={8} r={4} />
      <Path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </Svg>
  );
}

export function StudentsIcon({ size = 20, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Circle cx={9} cy={8} r={3.5} />
      <Path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5" />
      <Circle cx={17} cy={9} r={3} />
      <Path d="M15 14.2c2.8.3 5 2.2 5 5.8" />
    </Svg>
  );
}

export function ReportsIcon({ size = 20, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M6 20V10M12 20V4M18 20v-7" />
    </Svg>
  );
}

export function MessageIcon({ size = 21, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M21 11.5a8.4 8.4 0 01-1.1 4.2 8.5 8.5 0 01-7.4 4.3 8.4 8.4 0 01-4.2-1.1L3 21l2.1-5.3A8.4 8.4 0 014 11.5 8.5 8.5 0 018.3 4.1a8.4 8.4 0 014.2-1.1h.5a8.5 8.5 0 018 8v.5z" />
    </Svg>
  );
}

export function LogoutIcon({ size = 15, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <Path d="M16 17l5-5-5-5" />
      <Path d="M21 12H9" />
    </Svg>
  );
}

export function SunIcon({ size = 22, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Circle cx={12} cy={12} r={4} />
      <Path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Svg>
  );
}

export function MoonIcon({ size = 22, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8Z" />
    </Svg>
  );
}

export function StopIcon({ size = 22, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Rect x={6} y={6} width={12} height={12} rx={1} />
    </Svg>
  );
}

export function EyeIcon({ size = 20, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <Circle cx={12} cy={12} r={3} />
    </Svg>
  );
}

export function EyeOffIcon({ size = 20, color = '#000', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, strokeWidth)}>
      <Path d="M9.88 9.88a3 3 0 104.24 4.24" />
      <Path d="M10.73 5.08A10.43 10.43 0 0112 5c7 0 11 7 11 7a13.16 13.16 0 01-1.67 2.68" />
      <Path d="M6.61 6.61A13.53 13.53 0 001 12s4 7 11 7a9.74 9.74 0 005.39-1.61" />
      <Path d="M2 2l20 20" />
    </Svg>
  );
}

export function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Path
        fill="#4285F4"
        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4818h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.8741 2.6836-6.6154z"
      />
      <Path
        fill="#34A853"
        d="M9 18c2.43 0 4.4673-.8064 5.9564-2.1818l-2.9087-2.2581c-.8063.54-1.8368.8591-3.0477.8591-2.3436 0-4.3282-1.5831-5.0359-3.7104H.9573v2.3318C2.4382 15.9832 5.4818 18 9 18z"
      />
      <Path
        fill="#FBBC05"
        d="M3.9641 10.71c-.18-.54-.2822-1.1163-.2822-1.71s.1022-1.17.2822-1.71V4.9582H.9573C.3477 6.1732 0 7.5477 0 9s.3477 2.8268.9573 4.0418L3.9641 10.71z"
      />
      <Path
        fill="#EA4335"
        d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5814-2.5814C13.4632.8918 11.43 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.9641 7.29C4.6718 5.1627 6.6564 3.5795 9 3.5795z"
      />
    </Svg>
  );
}
