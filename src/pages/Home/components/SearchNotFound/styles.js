import styled from "styled-components";

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;

  span {
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-left: 16px;
    word-break: break-word;

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
