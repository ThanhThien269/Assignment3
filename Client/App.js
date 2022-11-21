import React from 'react';
import { StyleSheet} from 'react-native';

import PageManage from './views/PageManage';
import { Provider } from 'react-redux';
import store from './Redux/Stores/Store';

export default function App() {
  return (
    
    <Provider store={store}>
      <PageManage/>
      {/* <ImagePickerDemo/> */}
     </Provider>

   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
});
