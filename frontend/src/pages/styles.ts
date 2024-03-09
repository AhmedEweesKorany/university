import styled from "styled-components";

const TRANSITION_TIME = 0.3;

export const Wrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 7px 0.875rem rgba(0, 0, 0, 0.1), 0 5px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    width: 768px;
    margin:50px auto;
    max-width: 100%;
    min-height: 480px;

    .form-container {
      position: absolute;
      
      height: 100%;
      transition: all ${TRANSITION_TIME - 0.05}s ease-in-out;

      form {
        background-color: #ffffff;
        display: flex;
        justify-content:center;
        align-items:center;
        align-items: start;
        flex-direction: column;
        padding: 2rem 3rem;
        min-height: 100%;
        text-align: center;

        h1 {
          margin: 0 auto 1.5rem auto;
        }

        input {
          border: none;
          padding: 0.75rem 1rem;
          margin: 0.5rem 0;
          width: 100%;
          border: 1px solid #bdbdbd;
          border-radius: 3px;
          margin-bottom: 1.5rem;
        }

        span.link {
          color: #333;
          font-size: 0.875rem;
          text-decoration: none;
          margin-left: auto;
          cursor: pointer;
          text-decoration: underline;
        }

        button {
          border-radius: 20px;
          border: none;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: bold;
          padding: 0.75rem 1.5rem;
          letter-spacing: 1px;
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;

          :active {
            transform: scale(0.95);
          }

          :focus {
            outline: none;
          }
        }
      }

      &.sign-in-container {
        left: 0;
        width: 50%;
        z-index: 2;

        button {
          background-color: #127C71;
        
        }
      }

      &.sign-up-container {
        left: 0;
        width: 50%;
        opacity: 0;
        z-index: 1;

        button {
          background-color: #1f2934;
          :hover {
            background-color: #314456;
          }
        }
      }
    }

    .overlay-container {
      position: absolute;
      margin: auto 0;
      left: 50%;
      width: 50%;
      height: 120%;
      overflow: hidden;
      transition: transform ${TRANSITION_TIME}s ease-in-out;
      z-index: 100;
      transform: translateX(5px);

      .overlay {
        background: #127C71;
        color: #fff;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateX(0);
        transition: transform ${TRANSITION_TIME}s ease-in-out, background ${TRANSITION_TIME}s ease-in-out,
          color ${TRANSITION_TIME}s ease-in-out;

        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 2.5rem;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transform: translateX(0);
          transition: transform ${TRANSITION_TIME}s ease-in-out;

          p {
            font-size: 1.3rem;
            margin: 0;
            line-height: 1.7rem;
          }

          .title {
            font-size: 2.75rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }

          &.overlay-left {
            transform: translateX(-20%);
          }

          &.overlay-right {
            right: 0;
            transform: translateX(0);
          }
        }
      }
    }

    &.signup-active {
      .form-container {
        &.sign-in-container {
          transform: translateX(100%);
        }

        &.sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: show ${TRANSITION_TIME}s ease-in-out;

          @keyframes show {
            0%,
            49.99% {
              opacity: 0;
              z-index: 1;
            }

            50%,
            100% {
              opacity: 1;
              z-index: 5;
            }
          }
        }
      }

      .overlay-container {
        transform: translateX(calc(-100% - 5px));

        .overlay {
          transform: translateX(50%);
          background: #314456;
          color: #fff;

          .overlay-panel {
            &.overlay-left {
              transform: translateX(0);
            }

            &.overlay-right {
              transform: translateX(20%);
            }
          }
        }
      }
    }
  }
`;