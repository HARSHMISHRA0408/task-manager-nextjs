import '../app/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <header>
            <h1>Task Manager</h1>
          </header>
          <main>{children}</main>
          <footer>
            <p>Task Manager</p>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
