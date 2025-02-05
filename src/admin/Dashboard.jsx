import React, { useState } from 'react';
import { FaHome, FaUsers, FaBoxes, FaShoppingBag, FaPlus } from 'react-icons/fa';
import DashboardHome from './DashboardHome';
import UserList from './UserList';
import ProductList from './ProductList';
import OrderUser from './OrderUser';
import AddProducts from './AddProducts';
const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container mt-4">
      {/* Tab list */}
      <ul className="nav nav-tabs" id="myTab" style={{ backgroundColor: 'indigo' }} role="tablist">
        <li className="nav-item" role="presentation" style={{ padding: '8px' }}>
          <a
            className={`fs-6 fs-md-4 ${activeTab === 1 ? 'active' : ''}`}
            id="home-tab"
            href="#home"
            role="tab"
            style={{ color: 'white', padding: '3px', textDecoration: 'none' }}
            aria-selected={activeTab === 1}
            onClick={() => handleTabClick(1)}
          >
            <FaHome size={20} style={{ color: 'white' }} />
            <span className="p-1">Dashboard</span>
          </a>
        </li>

        <li className="nav-item" role="presentation" style={{ padding: '8px' }}>
          <a
            className={`fs-6 fs-md-4 ${activeTab === 2 ? 'active' : ''}`}
            id="userslist-tab"
            href="#userslist"
            role="tab"
            style={{ color: 'white', padding: '3px', textDecoration: 'none' }}
            aria-selected={activeTab === 2}
            onClick={() => handleTabClick(2)}
          >
            <FaUsers size={20} style={{ color: 'white' }} />
            <span className="p-1">Users List</span>
          </a>
        </li>

        <li className="nav-item" role="presentation" style={{ padding: '8px' }}>
          <a
            className={`fs-6 fs-md-4 ${activeTab === 3 ? 'active' : ''}`}
            id="product-list-tab"
            href="#product-list"
            role="tab"
            style={{ color: 'white', padding: '3px', textDecoration: 'none' }}
            aria-selected={activeTab === 3}
            onClick={() => handleTabClick(3)}
          >
            <FaBoxes style={{ color: 'white' }} />
            <span className="p-1">Product List</span>
          </a>
        </li>

        <li className="nav-item" role="presentation" style={{ padding: '8px' }}>
          <a
            className={`fs-6 fs-md-4 ${activeTab === 4 ? 'active' : ''}`}
            id="orderlist-tab"
            href="#orderlistUsers"
            role="tab"
            style={{ color: 'white', padding: '3px', textDecoration: 'none' }}
            aria-selected={activeTab === 4}
            onClick={() => handleTabClick(4)}
          >
            <FaShoppingBag style={{ color: 'white' }} />
            <span className="p-1">Orders</span>
          </a>
        </li>

        <li className="nav-item" role="presentation" style={{ padding: '8px' }}>
          <a
            className={`fs-6 fs-md-4 ${activeTab === 5 ? 'active' : ''}`}
            id="addproducts-tab"
            href="#addproducts"
            role="tab"
            style={{ color: 'white', padding: '3px', textDecoration: 'none' }}
            aria-selected={activeTab === 5}
            onClick={() => handleTabClick(5)}
          >
            <FaPlus size={20} style={{ color: 'white' }} />
            <span className="p-1">Add Product</span>
          </a>
        </li>
      </ul>

      {/* Tab content */}
      <div className="tab-content mt-3" id="myTabContent">
        <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="home" role="tabpanel">
          {/* content */}
         
          <DashboardHome/>
        </div>

        <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`} id="userslist" role="tabpanel">
          <h4>User List</h4>
         <UserList/>
        </div>

        <div className={`tab-pane fade ${activeTab === 3 ? 'show active' : ''}`} id="product-list" role="tabpanel">
          <h4>Product List</h4>
        <ProductList/>
        </div>

        <div className={`tab-pane fade ${activeTab === 4 ? 'show active' : ''}`} id="orderlistUsers" role="tabpanel">
          <h4>Orders</h4>
         <OrderUser/>
        </div>

        <div className={`tab-pane fade ${activeTab === 5 ? 'show active' : ''}`} id="addproducts" role="tabpanel">
          <h4>Add Product</h4>
          <AddProducts/>
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
