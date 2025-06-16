## Project Startup

If this is a fresh clone of the starter template:

1. Clone the repo:

   ```bash
   git clone https://github.com/CoderLovely08/react-dashboard-starter
   cd react-dashboard-starter
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development:
   ```bash
   npm run dev
   ```

## Project Structure

```bash
src/
├── api/
│   └── common.api.js  # Common CRUD API functions to make API calls
│
├── components/
│   └── custom/
│       ├── utils/
│       │   ├── Container.jsx
│       │   ├── GoBackButton.jsx
│       │   ├── LoadingSpinner.jsx
│       │   ├── CustomTooltip.jsx
│       │   └── GenericTable.jsx
│       │
│       └── ui/
│           └── HighlightCard.jsx
├── core/
│   └── axios.js  # Axios instance for API calls
│   
├── hooks/
│   └── common/
│       ├── useFetch.jsx  # Custom hook for fetching data
│       └── useCustomMutation.jsx  # Custom hook for performing mutations
│
├── layouts/
│   └── DashboardLayout.jsx  # Layout for the dashboard
│
├── pages/
│   └── Components/
│       ├── AddDialog.jsx  # Dialog for adding new items
│       ├── GenericTableComp.jsx  # Component for displaying a table of items
│       └── ... More components
│
├── routes/
│   └── route.jsx  # BrowserRouter setup
│
├── store/
│   ├── slices/
│   │   └── authSlice.jsx  # Authentication slice
│   └── store.js  # Redux store setup
│
└── utils/
    └── app.constants.js  # Constants for the app
```

## List of Components

1. Dialog
2. GenericTable
