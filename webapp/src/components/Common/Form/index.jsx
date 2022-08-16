import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

Form.propTypes = {
  defaultValues: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function Form({ defaultValues, children, onSubmit }) {
  const { handleSubmit, register } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
}
