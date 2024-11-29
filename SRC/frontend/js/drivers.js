document.addEventListener('DOMContentLoaded', () => {
    const driversTableBody = document.querySelector('#drivers-table-body');
    const sortNameButton = document.getElementById('sort-name');
    const sortLicenseButton = document.getElementById('sort-license');
    const sortAvailabilityButton = document.getElementById('sort-availability');
  
    const sortState = {
      name: 'asc',
      license: 'asc',
      availability: 'asc',
    };
  
    let drivers = []; // To hold fetched drivers
  
    // Fetch drivers from the API
    const fetchDrivers = () => {
      fetch('http://localhost:3000/api/drivers')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          drivers = data; // Save fetched drivers
          populateDriversTable(drivers);
        })
        .catch((error) => {
          console.error('Error fetching drivers:', error);
          driversTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-red-500 py-4">Failed to load drivers</td></tr>`;
        });
    };
  
    // Populate the table with driver data
    const populateDriversTable = (drivers) => {
      // Clear the table body before populating
      driversTableBody.innerHTML = '';
  
      drivers.forEach((driver) => {
        const row = document.createElement('tr');
  
        row.innerHTML = `
          <td class="px-4 py-2 border">${driver.Driver_ID}</td>
          <td class="px-4 py-2 border">${driver.F_Name} ${driver.L_Name}</td>
          <td class="px-4 py-2 border">${driver.License_Type}</td>
          <td class="px-4 py-2 border">${driver.Availability ? 'Available' : 'Unavailable'}</td>
          <td class="px-4 py-2 border">${driver.Phone_No}</td>
          <td class="px-4 py-2 border">${driver.Dispatcher_ID || 'N/A'}</td>
        `;
  
        driversTableBody.appendChild(row);
      });
    };
  
    // Update the sorting arrow direction
    const updateSortIcon = (key) => {
      const button = document.getElementById(`sort-${key}`);
      const svgPath = button.querySelector('svg path');
      if (sortState[key] === 'asc') {
        svgPath.setAttribute(
          'd',
          'M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
        ); // Down arrow
      } else {
        svgPath.setAttribute(
          'd',
          'M5.293 12.707a1 1 0 011.414 0L10 9.414l3.293 3.293a1 1 0 011.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 001.414 1.414z'
        ); // Up arrow
      }
    };
  
    // Sort drivers based on the selected key
    const sortDrivers = (key) => {
      sortState[key] = sortState[key] === 'asc' ? 'desc' : 'asc'; // Toggle sort direction
  
      const sortedDrivers = [...drivers].sort((a, b) => {
        if (key === 'name') {
          const nameA = `${a.F_Name} ${a.L_Name}`.toLowerCase();
          const nameB = `${b.F_Name} ${b.L_Name}`.toLowerCase();
          return sortState[key] === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        } else if (key === 'license') {
          return sortState[key] === 'asc'
            ? a.License_Type.localeCompare(b.License_Type)
            : b.License_Type.localeCompare(a.License_Type);
        } else if (key === 'availability') {
          return sortState[key] === 'asc'
            ? a.Availability - b.Availability
            : b.Availability - a.Availability;
        }
      });
  
      updateSortIcon(key);
      populateDriversTable(sortedDrivers);
    };
  
    // Attach event listeners to sorting buttons
    sortNameButton.addEventListener('click', () => sortDrivers('name'));
    sortLicenseButton.addEventListener('click', () => sortDrivers('license'));
    sortAvailabilityButton.addEventListener('click', () => sortDrivers('availability'));
  
    // Initial fetch
    fetchDrivers();
  });
  
  