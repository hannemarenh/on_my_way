"use client"
import React, { useState } from 'react'
import LocationToggle from './LocationToggle';
import { Location } from '../Utils/Location';

type NavBarProps = {};

export default function NavBar({ }: NavBarProps) {
	const [currentLocation, setCurrentLocation] = useState<Location>(Location.eidsvollVerk);
	const changeLocation = () => { setCurrentLocation(currentLocation == Location.eidsvollVerk ? Location.oslo : Location.eidsvollVerk) }

	return (
		<nav className="shadow-sm sticky top-0 left-0 z-50">
			<div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
				<div className="flex items-center justify-center gap-2">
					<h2 text-3xl>
						Weather
					</h2>
				</div>
				<LocationToggle activeLocation={currentLocation} onChange={changeLocation} />
			</div>
		</nav>
	)
}