class ListLocation {
  async mapThroughtCanadaProvinces() {
    const handleGetAllProvincesCanada = async () => {
      const res = await fetch(
        `${process.env.MAIN_API_ENDPOINT}/addresses/get/all/provinces`,
        {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await res.json();
      console.log('provinces:', data);
      return data;
    };

    const provinces = await handleGetAllProvincesCanada();

    const provincesList = [];
    for (const [key, value] of Object.entries(provinces)) {
      provincesList.push({
        abbr: key,
        name: value
      });
    }
    console.log('provincesList:', provincesList);
    return provincesList;
  }

  async mapThroughtCanadaCities(province) {
    console.log('province selected:', province);
    const handleGetAllCitiesFromProvinceCanada = async () => {
      const res = await fetch(
        `${process.env.MAIN_API_ENDPOINT}/addresses/get/all/cities/from/${province}`,
        {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await res.json();
      return data;
    };

    const cities = await handleGetAllCitiesFromProvinceCanada();
    console.log('cities:', cities);
    return cities;
  }
}

export default ListLocation;
