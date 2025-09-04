import React from 'react';
import { Link } from 'react-router-dom';
import { Log } from '../../../LoggingMiddleware/src/logger';

const Header: React.FC = () => {
  React.useEffect(() => {
    Log('frontend', 'debug', 'component', 'Header component mounted');
  }, []);

  return (
    <header className="header">
      <div className="container">
        <h1>Item Management System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/items/new">Add Item</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;