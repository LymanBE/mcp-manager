export type ServerConfig = {
	icon: JSX.Element
	description: string
	variables: {
		name: string
		argIndex: number
		value: string
	}[]
	terminalCommand: string
	docsUrl: string
}

export const SERVER_CONFIGS: Record<string, ServerConfig> = {
	cloudflare: {
		icon: (
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					viewBox="0 0 460 271.2"
					width="80px"
					height="47px"
					aria-hidden="true"
				>
					<title>Cloudflare logo</title>
					<path
						fill="#FBAD41"
						d="M328.6,125.6c-0.8,0-1.5,0.6-1.8,1.4l-4.8,16.7c-2.1,7.2-1.3,13.8,2.2,18.7    c3.2,4.5,8.6,7.1,15.1,7.4l26.2,1.6c0.8,0,1.5,0.4,1.9,1c0.4,0.6,0.5,1.5,0.3,2.2c-0.4,1.2-1.6,2.1-2.9,2.2l-27.3,1.6    c-14.8,0.7-30.7,12.6-36.3,27.2l-2,5.1c-0.4,1,0.3,2,1.4,2h93.8c1.1,0,2.1-0.7,2.4-1.8c1.6-5.8,2.5-11.9,2.5-18.2    c0-37-30.2-67.2-67.3-67.2C330.9,125.5,329.7,125.5,328.6,125.6z"
					/>
					<path
						fill="#F6821F"
						d="M292.8,204.4c2.1-7.2,1.3-13.8-2.2-18.7c-3.2-4.5-8.6-7.1-15.1-7.4l-123.1-1.6    c-0.8,0-1.5-0.4-1.9-1s-0.5-1.4-0.3-2.2c0.4-1.2,1.6-2.1,2.9-2.2l124.2-1.6c14.7-0.7,30.7-12.6,36.3-27.2l7.1-18.5    c0.3-0.8,0.4-1.6,0.2-2.4c-8-36.2-40.3-63.2-78.9-63.2c-35.6,0-65.8,23-76.6,54.9c-7-5.2-15.9-8-25.5-7.1    c-17.1,1.7-30.8,15.4-32.5,32.5c-0.4,4.4-0.1,8.7,0.9,12.7c-27.9,0.8-50.2,23.6-50.2,51.7c0,2.5,0.2,5,0.5,7.5    c0.2,1.2,1.2,2.1,2.4,2.1h227.2c1.3,0,2.5-0.9,2.9-2.2L292.8,204.4z"
					/>
				</svg>
			</div>
		),
		description: "Manage your Cloudflare resources and configurations",
		variables: [
			{
				name: "account id",
				argIndex: 2,
				value: ""
			}
		],
		terminalCommand: "npx @cloudflare/mcp-server-cloudflare init",
		docsUrl:
			"https://developers.cloudflare.com/cloudflare-one/mcp/cloudflare-server"
	}
}
