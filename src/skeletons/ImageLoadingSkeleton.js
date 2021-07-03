import { Col, Row, Skeleton } from 'antd';
import PropTypes from 'prop-types';

import React from 'react';

const ImageLoadingSkeleton = (props) => {
  const { items } = props;
  return (
    <Row gutter={[16, 16]}>
      {Array(items)
        .fill(0)
        .map(() => (
          <Col span={6}>
            <Skeleton.Image size="large" />
          </Col>
        ))}
    </Row>
  );
};

ImageLoadingSkeleton.propTypes = {
  items: PropTypes.number,
};

ImageLoadingSkeleton.defaultProps = {
  items: 8,
};

export default ImageLoadingSkeleton;
