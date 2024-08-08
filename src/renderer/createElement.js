const createElement = (tag, classes = []) => {
  const element = document.createElement(tag);
  element.classList.add(...classes);

  return element;
};

export default createElement;
