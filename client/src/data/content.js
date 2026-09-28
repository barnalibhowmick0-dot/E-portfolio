export const skills = [
  {
    name: "Python",
    icon: "images/skills/python.svg",
    desc: "Used for geospatial data analysis, automation, spatial processing and data visualization.",
    tools: ["GeoPandas", "Shapely", "NumPy", "Pandas", "Matplotlib"],
    application: "Geospatial Analysis · Remote Sensing · Automation"
  },

  {
    name: "SQL",
    icon: "images/skills/sql.svg",
    desc: "Used to query, filter and analyse structured spatial and non-spatial datasets.",
    tools: ["SQL Queries", "Joins", "Filtering", "Aggregation"],
    application: "Database Analysis · Spatial Data"
  },

  {
    name: "PostgreSQL",
    icon: "images/skills/postgresql.svg",
    desc: "Used for managing structured geographic data and performing database-based spatial analysis.",
    tools: ["PostgreSQL", "PostGIS", "Spatial Queries"],
    application: "Spatial Databases · GIS"
  },

  {
    name: "ArcGIS",
    icon: "images/skills/arcgis.svg",
    desc: "Used for cartography, spatial analysis, geoprocessing and interactive geographic visualization.",
    tools: ["ArcGIS Pro", "StoryMaps", "Spatial Analysis"],
    application: "GIS · Cartography · Web Mapping"
  },

  {
    name: "QGIS",
    icon: "images/skills/qgis.svg",
    desc: "Used for GIS analysis, thematic mapping, spatial processing and geospatial visualization.",
    tools: ["QGIS", "Processing", "Raster Analysis", "Vector Analysis"],
    application: "GIS · Spatial Analysis · Mapping"
  },

  {
    name: "TerrSet",
    icon: "images/skills/terrset.svg",
    desc: "Used for environmental modelling, land-change analysis and geospatial decision support.",
    tools: ["TerrSet", "Land Change Modeler", "Spatial Analysis"],
    application: "Environmental Modelling · Land Change"
  },

  {
    name: "Agisoft",
    icon: "images/skills/agisoft.svg",
    desc: "Used for photogrammetric processing and generation of 3D spatial products from imagery.",
    tools: ["Agisoft Metashape", "Photogrammetry", "3D Reconstruction"],
    application: "Photogrammetry · 3D Mapping"
  },

  {
    name: "Microsoft",
    icon: "images/skills/microsoft.svg",
    desc: "Used for documentation, presentations, spreadsheets and organizing analytical workflows.",
    tools: ["Word", "Excel", "PowerPoint"],
    application: "Documentation · Data Handling · Presentation"
  },

  {
    name: "GitHub",
    icon: "images/skills/github.svg",
    desc: "Used for version control, project documentation, portfolio development and publishing geospatial work.",
    tools: ["Git", "GitHub", "GitHub Pages"],
    application: "Version Control · Portfolio · Deployment"
  },

  {
    name: "Jupyter",
    icon: "images/skills/jupyter.svg",
    desc: "Used for interactive Python-based analysis, experimentation, visualization and reproducible workflows.",
    tools: ["Jupyter Notebook", "Python", "Data Analysis"],
    application: "Programming · Analysis · Documentation"
  }
];
export const education=[
 {degree:'Master of Science · Geoinformatics',institute:'Bharati Vidyapeeth (Deemed to be University), Institute of Environment Education and Research',period:'2025—2027'},
 {degree:'BA (Hons.) · Geography',institute:'Shyama Prasad Mukherji College, University of Delhi',period:'2022—2025'}
]
export const experiences=[
 {org:'EarthSight Foundation',role:'Forest Landscape Restoration Intern',date:'MAY 2026 — ONGOING',type:'FOREST LANDSCAPE RESTORATION',summary:'Working on geospatial applications connected with Forest Landscape Restoration.',points:['GIS-based mapping for restoration work','Environmental and spatial analysis workflows'],imageLabel:'ADD EARTHSIGHT FIELD PHOTO'},
 {org:'India Space Lab',role:'Summer Internship & Technical Training Program',date:'MAY 01 — JUN 15, 2026',type:'SPACE + GEO TRAINING',summary:'A structured learning and training experience spanning space technology, remote sensing, GIS and disaster management.',points:['Advanced Drone Technology; CanSat & CubeSat systems','Remote Sensing & GIS; Rocketry; Disaster Management','Projects in autonomous navigation, heat-wave response and rocket-fin evaluation'],imageLabel:'ADD INDIA SPACE LAB PHOTO',proof:'/documents/India_Space_Lab_Completion_Letter.pdf'},
 {org:'ENVIPRA',role:'Geospatial Intern',date:'DEC 2025 — JAN 2026',type:'GEOSPATIAL INTERNSHIP',summary:'Applied satellite and GIS workflows to environmental and landscape-focused problems.',points:['Analysed satellite-derived LULC, LST and NDVI trends for Pashan-Baner Hill','Produced GIS-based maps for Forest Landscape Restoration','Contributed to carbon footprint mapping and primary field data collection at SwaGram'],imageLabel:'ADD ENVIPRA PHOTO'}
]
export const projects=[
 {title:'Urban Commute Flows',categories:['WEBGIS','DATA VISUALIZATION'],description:'Interactive geospatial intelligence concept for exploring urban commute flows and spatial movement patterns.',tools:['Web GIS','Spatial Analysis','Visualization'],art:'FLOW / NETWORK',approach:'Use interactive spatial views to turn movement data into a readable urban story.',github:'https://github.com/barnalibhowmick0-dot/Urban_Commute_Flows'},
 {title:'MODIS Vegetation Analysis — State-wise',categories:['REMOTE SENSING','DATA VISUALIZATION'],description:'Interactive state-wise vegetation analysis using MODIS and geospatial visualization workflows.',tools:['MODIS','GEE','Zonal Statistics'],art:'NDVI / INDIA',approach:'Satellite-derived vegetation information is summarized spatially to compare patterns across states.',github:'https://github.com/barnalibhowmick0-dot/MODIS_Vegetation_Analysis_State-wise'},
 {title:'3D Earthquake Visualization',categories:['WEBGIS','DATA VISUALIZATION'],description:'A 3D geospatial visualization concept for exploring earthquake locations and spatial patterns.',tools:['3D Globe','GeoJSON','Visualization'],art:'EARTH / SEISMIC',approach:'Translate point-based earthquake information into an exploratory 3D spatial experience.',github:'https://github.com/barnalibhowmick0-dot/3D_Earthquake_Visualization'},
 {title:'Kondethar & Adarwadi Solar + Vulnerability',categories:['ENVIRONMENT','GIS'],description:'Future risk and vulnerability assessment with solar panel installation mapping for villages in Maharashtra.',tools:['GIS','Suitability','Vulnerability'],art:'SOLAR / VULNERABILITY',approach:'Combine spatial criteria and village-scale context to support suitability and vulnerability mapping.',github:'https://github.com/barnalibhowmick0-dot/my-website'},
 {title:'New Delhi NDVI',categories:['REMOTE SENSING','GIS'],description:'Sample NDVI visualization for New Delhi, presented as an interactive web map.',tools:['NDVI','Web Map','Remote Sensing'],art:'VEGETATION / DELHI',approach:'Present vegetation index information as an accessible browser-based map.',github:'https://github.com/barnalibhowmick0-dot/NewDelhi-NDVI'},
 {title:'New Delhi NDWI',categories:['REMOTE SENSING','GIS'],description:'Sample NDWI visualization for New Delhi, presented as an interactive web map.',tools:['NDWI','Web Map','Remote Sensing'],art:'WATER / DELHI',approach:'Use a water-related spectral index to visualize spatial patterns through a web map.',github:'https://github.com/barnalibhowmick0-dot/NewDelhi-NDWI'},
 {title:'PGII Spatial Learning Lab',categories:['GIS'],description:'A collection of geospatial learning and assignment work including Delhi datasets, DEM, NDVI and vector layers.',tools:['GeoJSON','DEM','NDVI','GIS'],art:'LAYERS / DELHI',approach:'Build practical GIS fluency through raster, vector and spatial-data exercises.',github:'https://github.com/barnalibhowmick0-dot/PGII_BB'}
]
export const fieldwork=[
 {title:'SwaGram · Carbon Footprint Mapping',location:'Agro-tourism village',date:'FIELD DATA',note:'Primary data collection around tree metrics, land use and field areas. Add photographs and observations here.',imageLabel:'ADD FIELD PHOTO'},
 {title:'Pashan–Baner Hill · Environmental Mapping',location:'Pune, Maharashtra',date:'GIS + SATELLITE',note:'A visual field journal for the landscape context behind LULC, LST and NDVI analysis.',imageLabel:'ADD FIELD / LANDSCAPE PHOTO'},
 {title:'Adarwadi · Solar Suitability',location:'Raigad, Maharashtra',date:'FIELD / MAPPING',note:'Document field observations, village context and the practical side of suitability mapping.',imageLabel:'ADD ADARWADI PHOTO'}
]
