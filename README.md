# Welcome

## Disclaimers:

-   This project is owned by team, only using for training purposes. Please do NOT leak, upload to anywhere (except team's permission and monitoring).
-   This project is based on around 20% tasks as team's workspace.

### Installation:

```
1. git clone ...
2. rm -rf .git
3. npm i --legacy-peer-deps (sorry, this project is training project so you know... ¯\_(ツ)_/¯)
4. npm run dev
```

### Folder structure:

```
project
│   README.md (IMPORTANT !!!)
│
│───app (basically only containing stuffs)
│
└───components (basically containing small and reusable components)
│
└───constants (basically containing shared and global constants only)
│
└───containers (containing big components having more than 6 components inside, page > container > components)
│
└───ducks (containing ducks, each single duck is combined from `reducers`, `selectors`, `actions` as `creators`,...)
│   │   file011.txt
│   │   file012.txt
│   │
│   └───subfolder1
│       │   file111.txt
│       │   file112.txt
│       │   ...
│
└───folder2
    │   file021.txt
    │   file022.txt
```

### Libraries:

### Backlog:

1. Feature: Make UI/UX - Search Cars Page (SCP)
   ![image](https://github.com/ttnguyen115/ojt/assets/56264793/ae70d872-96f7-44fd-9f3e-76e0ff8a3e4f)
   Car API: https://github.com/ttnguyen115/ojt/blob/master/postman_collection.json
    - US1001: Split page layout by border with responsive
    - US1002: Create grid of cars with responsive
    - US1003: Making dynamic car item card with data
    - US1004: Fetching car filters API and combining into a single duck for SCP
2. Feature F20000: Make UI/UX and filter behaviors - Search Car Page (SCP)
    - US1005: Making UI filters for Desktop view part 1 (vehicle bodies, vehicle engines, exterior color, interior color, mileage)
    - US1006: Making UI filters for Desktop view part 2 (makes, models, trims, attributes, year)
    - US1007: Making functional behaviors for filters
    - US1008: Making UI filters for Mobile view part 1 (vehicle bodies, vehicle engines, exterior color, interior color, mileage)
    - US1009: Making UI filters for Mobile view part 2 (makes, models, trims, attributes, year)
3. Feature F30000: Make UI/UX and submitting email behavior - Car Detail Page (CDP)
4. Feature F40000: Make UI/UX - Compare Car Modal
5. Feature F50000: Make UI/UX - Filter chips in SCP
6. Feature F60000: Make UI/UX - Add Spotlight car at the top of SCP
7. Feature F70000: Navigate from SCP to CDP by custom hooks
8. Feature F80000: Add filter referrer when navigate from SCP to CDP
9. Feature F90000: `< Previous`, `Next >` buttons in CDP
10. Feature F11000: Auto scrolling down to Finance section after clicking item price and navigating to SCP
