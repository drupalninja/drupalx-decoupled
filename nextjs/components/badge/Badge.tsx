import Badge from 'react-bootstrap/Badge';
import './Badge.scss';

interface BadgeProps {
  tag: string;
  modifier?: string;
}

const BadgeComponent: React.FC<BadgeProps> = ({ tag, modifier }) => {
  return (
    <Badge className={`rounded-pill d-block fs-7 px-2 py-1 fw-semibold${modifier ? ` ${modifier}` : ''}`}>{tag}</Badge>
  );
};

export default BadgeComponent;
