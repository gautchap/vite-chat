import { keyframes } from "@emotion/react";

export const upFade = keyframes`
0%{
  transform: translate(0, 30px);
  opacity: 0;
  }

100%{
    transform: translate(0, 0);
    opacity: 1;
  }
`;

export const rightFade = keyframes`
0%{
  transform: translate(-10px, 0);
  opacity: 0;
  }

100%{
    transform: translate(0, 0);
    opacity: 1;
  }
`;

export const pulse = keyframes`
0%{
  transform: scale(0.9);
  }

100%{
  transform: scale(1);
  }
`;
