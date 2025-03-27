import { JSX, useEffect } from 'react'
import { Button, SpinLoading } from 'antd-mobile'
import useAppStore from './store/useAppStore';
import { useShallow } from 'zustand/shallow';
import Step1 from './components/Step1';
import { CloseOutline, LeftOutline } from 'antd-mobile-icons';
import Step2 from './components/Step2';

const App = (): JSX.Element => {
  const { loadingApp, getInitialApp, step } = useAppStore(useShallow((state) => ({
    loadingApp: state.loadingApp,
    getInitialApp: state.getInitialApp,
    step: state.step
  })));

  useEffect(() => {
    getInitialApp();
  }, [getInitialApp]);

  return <div style={{ position: 'relative', width: '100%', height: '100%', background: 'white', display: 'flex', flexDirection: 'column' }}>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: 12,
    }}>
      {step === 'CREATE_DOC' && <Button
        fill={'none'}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)'
        }}
        shape={'rounded'}
        onClick={() => useAppStore.setState({
          step: 'SELECT_PATTERN'
        })}
      >
        <LeftOutline
          style={{
            fontSize: 24,
            color: 'rgba(0, 0, 0, 0.45)'
          }}
        />
      </Button>}
      <div style={{
        fontSize: 16,
        fontWeight: 600,
        lineHeight: '24px'
      }}>Створити документ</div>
      <Button
        fill={'none'}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)'
        }}
        shape={'rounded'}
      >
        <CloseOutline
          style={{
            fontSize: 24,
            color: 'rgba(0, 0, 0, 0.45)'
          }}
        />
      </Button>

    </div>
    {loadingApp ? <SpinLoading color={'primary'} /> : <>
      {step === 'SELECT_PATTERN' && <Step1 />}
      {step === 'CREATE_DOC' && <Step2 />}
    </>}
  </div>;
}

export default App
