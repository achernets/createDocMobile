import { JSX, useEffect } from 'react'
import { SpinLoading } from 'antd-mobile'
import useAppStore from './store/useAppStore';
import { useShallow } from 'zustand/shallow';
import Step1 from './components/Step1';

const App = (): JSX.Element => {
  const { loadingApp, getInitialApp, step } = useAppStore(useShallow((state) => ({
    loadingApp: state.loadingApp,
    getInitialApp: state.getInitialApp,
    step: 'SELECT_PATTERN'
  })));

  useEffect(() => {
    getInitialApp();
  }, [getInitialApp]);

  return <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    {loadingApp ? <SpinLoading /> : <>
      {step === 'SELECT_PATTERN' && <Step1 />}
    </>}
  </div>;
}

export default App
