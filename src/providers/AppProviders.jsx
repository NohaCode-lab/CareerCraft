import PropTypes from 'prop-types';

import AuthProvider from '../context/AuthContext';
import ApplicationsProvider from '../context/ApplicationsContext';
import JobsProvider from '../context/JobsContext';
import LanguageProvider from '../context/LanguageContext';
import UIProvider from '../context/UIContext';

const providers = [
  AuthProvider,
  LanguageProvider,
  UIProvider,
  JobsProvider,
  ApplicationsProvider,
];

const AppProviders = ({ children }) => {
  return providers.reduceRight((content, Provider) => {
    return <Provider>{content}</Provider>;
  }, children);
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
