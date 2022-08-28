import PropTypes, { shape } from 'prop-types';

const rawResponseTechStackSchema = {
  key: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  techName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const parsedTechStackSchema = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export const rawResponseTechStackType = shape(rawResponseTechStackSchema);
export const parsedTechStackType = shape(parsedTechStackSchema);
