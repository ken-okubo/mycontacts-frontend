import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 48px;
  left: 50%;
  transform: translateX(
    -50%
  ); // -50% do tamanho do próprio elemento para centralizar
`;
