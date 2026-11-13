import React, { useEffect, useState } from "react";
import { Image, Space } from "antd";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const src =
  "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp";

const ToolbarWrapper = styled(Space)`
  & {
    display: flex;
    align-items: center;
    padding: 0 24px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    color: #fff;
    font-size: 20px;
  }

  & .anticon {
    padding: 12px;
    cursor: pointer;
  }

  & .anticon[disabled] {
    cursor: not-allowed;
    opacity: 0.3;
  }

  & .anticon:hover {
    opacity: 0.3;
  }
`;

const ImagePreviewGroup = ({
  items = [
    "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
    "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
    "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
  ],
  current = 0,
  onChange = (current, prevCurrent) => {},
}) => {
  const [currentState, setCurrentState] = useState(current);
  useEffect(() => {
    setCurrentState(current);
  }, [current]);
  const onDownload = ({ flipY, flipX, rotate }) => {
    const img = document.createElement("img");
    img.src = items[currentState];
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const { naturalWidth, naturalHeight } = img;

      // flip and rotate in canvas
      const angle = (rotate * Math.PI) / 180;
      const sinAngle = Math.sin(angle);
      const cosAngle = Math.cos(angle);
      canvas.width =
        Math.abs(naturalWidth * cosAngle) + Math.abs(naturalHeight * sinAngle);
      canvas.height =
        Math.abs(naturalWidth * sinAngle) + Math.abs(naturalHeight * cosAngle);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
      ctx.rotate(angle);
      ctx.drawImage(img, -naturalWidth / 2, -naturalHeight / 2);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      const urlObject = new URL(img.src);
      urlObject.search = "";
      link.download = urlObject.toString().split("/").pop();
      document.body.appendChild(link);
      link.click();
      link.remove();
    };
  };
  return (
    <Image.PreviewGroup
      items={items}
      preview={{
        current: currentState,
        onChange: (current, prevCurrent) => {
          setCurrentState(current);
          onChange(current, prevCurrent);
        },
        toolbarRender: (
          _,
          {
            transform: { scale, flipX, flipY, rotate },
            actions: {
              onFlipY,
              onFlipX,
              onRotateLeft,
              onRotateRight,
              onZoomOut,
              onZoomIn,
            },
          },
          a
        ) => (
          <ToolbarWrapper size={12}>
            <DownloadOutlined
              onClick={() => onDownload({ rotate, flipX, flipY })}
            />
            <SwapOutlined rotate={90} onClick={onFlipY} />
            <SwapOutlined onClick={onFlipX} />
            <RotateLeftOutlined onClick={onRotateLeft} />
            <RotateRightOutlined onClick={onRotateRight} />
            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
          </ToolbarWrapper>
        ),
      }}
    >
      {items?.map((value, index) => (
        <Box
          key={index}
          sx={{
            display: index === currentState ? "inline-block" : "none",
          }}
        >
          <Image src={value} />
        </Box>
      ))}
    </Image.PreviewGroup>
  );
};

export default React.memo(ImagePreviewGroup);
