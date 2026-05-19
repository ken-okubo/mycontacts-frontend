import ReactDOM from "react-dom";

export default function ReactPortal({ children, containertId }) {
  let container = document.getElementById(containertId);
  if (!container) {
    container = document.createElement("div");
    container.setAttribute("id", containertId);
    document.body.appendChild(container);
  }
  return ReactDOM.createPortal(children, container);
}
