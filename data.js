const geoLookup = {
  AONB: {
    URL: "https://services.arcgis.com/JJzESW51TqeY9uat/ArcGIS/rest/services/Areas_of_Outstanding_Natural_Beauty_England/FeatureServer/0/query?outFields=*&f=geoJson&where=CODE%20%3d%20%27",
    color: "blue",
  },
  TRAILENG: {
    URL: "https://services.arcgis.com/JJzESW51TqeY9uat/arcgis/rest/services/National_Trails_England/FeatureServer/0/query?outFields=*&f=geojson&where=GlobalID%20%3D%20%27",
    color: "red",
  },
  CPENG: {
    URL: "https://services.arcgis.com/JJzESW51TqeY9uat/ArcGIS/rest/services/Country_Parks_England/FeatureServer/0/query?outFields=*&f=geoJson&where=REF_CODE%20%3D%20%27",
    color: "orange",
  },
  RSPB: {
    URL: "https://services1.arcgis.com/h1C9f6qsGKmqXsVs/arcgis/rest/services/RSPB_Public_Reserves/FeatureServer/0/query?outFields=*&f=geoJson&where=FeatureID%20%3D%20%27",
    color: "green",
  },
  NNRENG: {
    URL: "https://services.arcgis.com/JJzESW51TqeY9uat/arcgis/rest/services/National_Nature_Reserves_England/FeatureServer/0/query?outFields=*&f=geoJson&where=GID%20%3D%20%27",
    color: "purple",
    areaPropName: "ne.ne_admin.ne_national_nature_reserves_england.area",
    minArea: 100,
  },
  SACENG: {
    URL: "https://services.arcgis.com/JJzESW51TqeY9uat/ArcGIS/rest/services/Special_Areas_Of_Conservation_England/FeatureServer/0/query?outFields=*&f=geoJson&where=SAC_CODE%20%3D%20%27",
    color: "black",
    areaPropName: "AREA",
    minArea: 500,
  },
  NPENG: {
    URL: "https://services.arcgis.com/JJzESW51TqeY9uat/ArcGIS/rest/services/National_Parks_England/FeatureServer/0/query?outFields=*&f=geoJson&where=CODE%20%3D%20%27",
    color: "brown",
  },
  SSSIENG: {
    URL: "https://services.arcgis.com/JJzESW51TqeY9uat/ArcGIS/rest/services/SSSI_England/FeatureServer/0/query?outFields=*&f=geoJson&where=GID%20%3D%20%27",
    color: "orange",
    areaPropName: "AREA",
    minArea: 100,
  },
  SPAENG: {
    URL: "https://services.arcgis.com/JJzESW51TqeY9uat/arcgis/rest/services/Special_Protection_Areas_England/FeatureServer/0/query?outFields=*&f=geojson&where=SPA_CODE%20%3D%20%27",
    color: "purple",
    areaPropName: "AREA",
    minArea: 100,
  },
  BIOENG: {
    URL: "https://services.arcgis.com/JJzESW51TqeY9uat/arcgis/rest/services/Biosphere_Reserves_England/FeatureServer/0/query?outFields=*&f=geojson&where=GlobalID%20%3D%20%27",
    color: "brown",
    areaPropName: "Shape__Area",
    minArea: 100,
  },
  KC3CP: {
    URL: "https://services.arcgis.com/JJzESW51TqeY9uat/arcgis/rest/services/England_Coast_Path_Route/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
    color: "red",
    areaPropName: "Shape__Length",
    minArea: 5,
  },
};
