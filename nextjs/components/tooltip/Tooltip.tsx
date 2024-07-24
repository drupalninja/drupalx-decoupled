import React from 'react';
import { OverlayTrigger, Tooltip as BSTooltip } from 'react-bootstrap';
import './Tooltip.scss';

interface TooltipProps {
  title: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
  const renderTooltip = (props: any) => (
    <BSTooltip id="button-tooltip" {...props}>
      {title}
    </BSTooltip>
  );

  return (
    <div className="col-9">
      <p className="muted">
        Placeholder text to demonstrate some&nbsp;
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <a href="#">{children}</a>
        </OverlayTrigger>
        &nbsp;with tooltips. This is now just filler, no killer. Content placed here just to mimic the presence of&nbsp;
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={<BSTooltip id="another-tooltip">Another tooltip</BSTooltip>}
        >
          <a href="#">real text</a>
        </OverlayTrigger>
        . And all that just to give you an idea of how tooltips would look when used in real-world situations. So hopefully you've now seen how&nbsp;
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={<BSTooltip id="another-one">Another one here too</BSTooltip>}
        >
          <a href="#">these tooltips on links</a>
        </OverlayTrigger>
        &nbsp;can work in practice, once you use them on&nbsp;
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={<BSTooltip id="last-tip">The last tip!</BSTooltip>}
        >
          <a href="#">your own</a>
        </OverlayTrigger>
        &nbsp;site or project.
      </p>
    </div>
  );
};

export default Tooltip;
