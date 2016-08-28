parse.file <- function(url, str.range, pattern, columns) {
  require(dplyr)
  require(readr)
  colTypes = paste(sample("i", size = 70, replace = T), collapse = "")
  data <- read_fwf(file = url, col_positions = fwf_widths(pattern[, 1]), skip = str.range[1], n_max = str.range[2], col_types = colTypes)
  colnames(data) <- pattern[, 2]
  data <- tbl_df(data)
  select_(data, .dots=columns)
}

preFilter <- function(dataTable, yearOfDeath) {
  mutate(
    dataTable,
    Year.Of.Death = as.integer(yearOfDeath),
    Age = mapply(ageInYears, Age.Type, Age), 
    Year.Of.Birth = mapply(yearOfBirth, Age, Year.Of.Death)
  )
}
filterData <- function(dataTable, year) {
  filter(dataTable, Year.Of.Birth >= as.integer(year)) %>%
  select(-Age.Type, -Day.D, -State.D)
}

postFilter <- function(dataTable, states) {
  mutate(
    dataTable,
    Resident.Status = sapply(Resident.Status, resident),
    State = sapply(State.R, function(state) {state(state, states)}),
    Sex = sapply(Sex, gender),
    Race = sapply(Race, race),
    Place.Of.Accident = sapply(Place.Of.Accident, placeOfAccident)
  ) %>%
  select(-State.R)
}
resident <- function(resident) {
  switch (resident,
    "Resident",
    "Resident",
    "Intrastate Resident",
    "Foreign Residents"
  )
}
state <- function(state, states) {
  as.character(states[state])
}
gender <- function(g) {
  switch(g, "Male", "Female")
}
race <- function(r) {
  switch (r + 1,
    "Guamian",
    "White",
    "Black",
    "Indian",
    "Chinese",
    "Japanese",
    "Hawaiian",
    "Other",
    "Filipino"
  )
}
ageInYears <- function(ageCode, ageValue) {
  switch (ageCode + 1,
    as.integer(ageValue),
    as.integer(100 + ageValue),
    as.integer(0),
    as.integer(0),
    as.integer(0),
    as.integer(0),
    as.integer(0),
    as.integer(0),
    as.integer(0),
    NA
  )
}
yearOfBirth <- function(age, yearOfDeath) {
  if (is.na(age)) {
    return(NA)
  } else {
    return(as.integer(yearOfDeath - age))
  }
}
placeOfAccident <- function(place) {
  if (is.na(place)) {
    return("Place Not Specified")
  }
  switch(place + 1,
    "Home",
    "Farm",
    "Mine and Quarry",
    "IndustrialPlaceand Premises",
    "Placeof Recreation and Sport",
    "Streetand Highway",
    "Public Building",
    "Resident Institution",
    "Other Specified Places",
    "Place Not Specified"
  )
}


processFile <- function(url, str.range, pattern, columns, year, states) {
  parse.file(url, str.range, pattern, columns) %>%
    preFilter(year) %>%
    filterData(1970) %>%
    postFilter(states = states78)
}