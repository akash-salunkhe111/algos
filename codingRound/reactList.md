## React List based on json, toggle list items on click
```
import React, { useState } from 'react';
import './style.css';

const navigation = [
  {
    label: 'Home',
  },
  {
    label: 'Search',
    children: [{ label: 'Users' }, { label: 'Products' }],
  },
  {
    label: 'Footer',
    children: [{ label: 'Links' }, { label: 'Contact' }],
  },
];

export default function App() {
  const [openIndex, setOpenIndex] = useState(null);
  const handleClick = (index) => {
    if (index === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  return (
    <div>
      {navigation.map((data, index) => (
        <ul>
          {data.label}
          {data.children && (
            <button onClick={() => handleClick(index)}> Toggle </button>
          )}
          {data.children &&
            openIndex === index &&
            data.children.map((child) => <li>{child.label}</li>)}
        </ul>
      ))}
    </div>
  );
}

```

Questions based on this
```
| Syntax                                   | Executes When? | Can Pass Args? |
| ---------------------------------------- | -------------- | -------------- |
| `onClick={handleClick}`                  | On click       | ❌ No           |
| `onClick={handleClick()}`                | Immediately    | ❌ Wrong        |
| `onClick={() => handleClick(index)}`     | On click       | ✅ Yes          |
| `onClick={(e) => handleClick(index, e)}` | On click       | ✅ Yes          |

```

## What if we want to track all states of list and not close when one is open
```
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index], // toggle only that menu
    }));
  };

    {/* Show children only if this menu is open */}
{item.children && openMenus[index] && (
    <ul>
    {item.children.map((child, childIndex) => (
        <li key={childIndex}>{child.label}</li>
    ))}
    </ul>
)}
```