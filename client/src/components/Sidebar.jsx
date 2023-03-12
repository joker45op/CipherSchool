import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import './Sidebar.css'

function Sidebar() {
  return (
    <div class="wrapper">
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Bootstrap Sidebar</h3>
            </div>

            <ul class="list-unstyled components">
                <p>Dummy Heading</p>
                <li class="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
                    <ul class="collapse list-styled" id="homeSubmenu">
                        <li>
                            Home 1
                        </li>
                        <li>
                            Home 2
                        </li>
                        <li>
                            Home 3
                        </li>
                    </ul>
                </li>
            </ul>
            <ul class="list-styled">
                <li>Settings</li>
            </ul>
        </nav>
    </div>
  );
}

export default Sidebar;
