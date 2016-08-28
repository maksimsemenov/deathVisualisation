width6878 <- c(1, 2, 1, 6, 1, 1, 2, 3, 3, 1, 3, 1, 2, 3, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 4, 2, 4, 5, 3, 3, 3, 13, 1, 7, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1)
names6878 <- c("Year.Last.D", "Shipment.N", "Reporting.Area", "Cert.Number", "Record.Type", "Resident.Status", "State.R", "County.R", "City.R", "City.R.Size", "SMSA", "M-N.Country.R", "State.D", "County.D", "Month.D", "Day.D", "Sex", "Race", "RR2", "RR3", "Age.Type", "Age", "Age.Recode-12", "Age.Recode-27", "Age.Infant.Recode-22", "Division.And.State.R.Subcode", "Division.And.State.O.Subcode", "Autopsy", "Findings", "IP1", "IP2", "Underlying.CoD", "CR281", "CR69", "ICR65", "CR34", "IP3", "Place.Of.Accident", "Sequence.N", "N.Of.Entity-Axis.Codes", "EAC1", "EAC2", "EAC3", "EAC4", "EAC5", "EAC6", "EAC7", "EAC8", "EAC9", "EAC10", "EAC11", "EAC12", "EAC13", "EAC14", "N.Of.Record-Axis.Codes", "RAC1", "RAC2", "RAC3", "RAC4", "RAC5", "RAC6", "RAC7", "RAC8", "RAC9", "RAC10", "RAC11", "RAC12", "RAC13", "RAC14", "IP4")

t6878 <- list(width = width6878, names = names6878, states = states78, )

states78 <- c(
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "Califonia",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Districtof Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Ioxa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Malyland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoning"
)

liveFlowColumns <- c("Resident.Status", "State.R", "City.R.Size", "State.D", "Month.D", "Day.D", "Sex", "Race", "Age.Type", "Age", "Underlying.CoD", "CR34", "CR69", "Place.Of.Accident")

ageInYears6878 <- function(ageCode, ageValue) {
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