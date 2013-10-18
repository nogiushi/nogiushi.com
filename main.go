package main

import (
	"flag"
)

var Address *string

func main() {
	Address = flag.String("address", ":9999", "http service address")
	flag.Parse()

	ListenAndServe(*Address)
}
