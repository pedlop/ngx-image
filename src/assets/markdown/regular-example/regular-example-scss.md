```css
.image-regular {
  width: 40em;
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  will-change: opacity;
  transition: opacity 0.5s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
```