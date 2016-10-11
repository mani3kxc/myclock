import { Injectable } from '@angular/core';

@Injectable()
export class TimerService {

public zerotime: number=0;


	begin()
	{
		this.zerotime = (new Date()).getTime();
	}

	gettime()
	{
		return (new Date()).getTime();
	}

	gettimefromnow()
	{
		if(this.zerotime)
			return (new Date()).getTime()-this.zerotime;
		else
			return 0;
	}
}