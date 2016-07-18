parse.file <- function(url, str.range, pattern, columns) {
  require(dplyr)
  require(readr)
  data <- read_fwf(file = url, col_positions = fwf_widths(pattern[, 1]), skip = str.range[1], n_max = str.range[2])
  colnames(data) <- pattern[, 2]
  data <- tbl_df(data)
  select_(data, .dots=columns)
}

parse.file.lines <- function(url, str.range, pattern, columns) {
  require(dplyr)
  data <- readLines(url, n = str.range[2])
  #print(tail(data))
  data <- gsub("\\\\", "0", data)
  data <- data[is.character(data)]
  data <- grep("[[:digit:]]", data, invert = TRUE)
  data <- read.fwf(textConnection(data), widths = pattern[, 1], col.names = pattern[, 2], skip = str.range[1], n = str.range[2], colClasses = "numeric")
  data <- tbl_df(data)
  select_(data, .dots=columns)
}
