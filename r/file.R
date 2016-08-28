readData <- function(fileUrl, pattern, columns) {
  require(dplyr)
  require(readr)
  colTypes = paste(sample("i", size = length(pattern[, 2]), replace = TRUE), collapse = "")
  data <- read_fwf(file = url,
                   col_positions = fwf_widths(pattern[, 1]),
                   skip = str.range[1],
                   n_max = str.range[2],
                   col_types = colTypes,
                   col_names = pattern[, 2])
  data <- tbl_df(data)
  select_(data, .dots=columns)
}

preFilterData <- function(data, yearOfDeath, ageInYearsFunction) {
  yearOfBirth <- function(age, yearOfDeath) {
    if (is.na(age)) {
      return(NA)
    } else {
      return(as.integer(yearOfDeath - age))
    }
  }
  mutate(
    data,
    Year.Of.Death = as.integer(yearOfDeath),
    Age = mapply(ageInYearsFunction, Age.Type, Age), 
    Year.Of.Birth = mapply(yearOfBirth, Age, Year.Of.Death)
  )
}

filterDataByYear <- function(data, year) {
  filter(data, Year.Of.Birth >= as.integer(year))
}

filterDataColumns <- function(data, columns) {
  select_(data, .dots = columns)
}

tranformData <- function(data, transformPattern) {
  matchingFunction <- function(value, translateTable) {
    translateTable[translateTable$keys == value, values]
  }
  for (transformer in transformPatterns) {
    data <- mutate(data, )
  }
}